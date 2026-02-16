const Challenge = require("../../src/models/Challenge");
const ActivityLog = require("../../src/models/ActivityLog");
const mongoose = require("mongoose");
// const User = require("../../src/models/User");

exports.getChallengesList = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      tab = "Challenges",
      status = "ongoing",
      page = 1,
      limit = 20
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;
    const now = new Date();
    let query = {};

    if (status === "ongoing") {
      query.startDate = { $lte: now };
      query.endDate = { $gte: now };
    } else if (status === "upcoming") {
      query.startDate = { $gt: now };
    } else if (status === "completed") {
      query.endDate = { $lt: now };
    }

    if (tab === "Leaderboard") {
      query.participants = userId;
    }

    const challenges = await Challenge.find(query)
      .sort({ startDate: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Challenge.countDocuments(query);

    const formattedChallenges = challenges.map(c => {
      const diffTime = new Date(c.endDate) - now;
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        id: c._id,
        title: c.title,
        description: c.description,
        targetDistance: c.targetDistance,
        currentDistance: c.currentDistance,
        unit: c.unit,
        daysLeft: daysLeft > 0 ? daysLeft : 0,
        participantsCount: c.participants ? c.participants.length : 0,
        icon: c.icon,
        startDate: c.startDate,
        endDate: c.endDate,
        isJoined: c.participants ? c.participants.some(p => p.toString() === userId.toString()) : false,
        sponsor: c.sponsor
      }
    });

    res.status(200).json({
      success: true,
      data: {
        challenges: formattedChallenges,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error("Error Fetching Challenges:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching challenges list"
    });
  }
};

exports.getChallengeDetails = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Challenge ID"
      });
    }

    const challenge = await Challenge.findById(challengeId).lean();
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found!"
      });
    }

    const participantsList = Array.isArray(challenge.participants) ? challenge.participants : [];

    let leaderboard = [];
    // Search ActivityLogs for all participants within the challenge date range
    if (participantsList.length > 0) {
      const leaderboardData = await ActivityLog.aggregate([
        {
          $match: {
            timestamp: {
              $gte: challenge.startDate,
              $lte: challenge.endDate
            },
            userId: {
              $in: challenge.participants
            }
          }
        },
        {
          $group: {
            _id: "$userId",
            totalDistance: {
              $sum: "$distance"
            }
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userInfo"
          }
        },
        {
          $unwind: "$userInfo"
        },
        {
          $sort: { totalDistance: -1 }
        },
        {
          $limit: 50
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            userName: { $concat: ["$userInfo.firstName", " ", "$userInfo.lastName"] },
            userAvatar: "$userInfo.profileImage",
            distance: { $round: ["$totalDistance", 2] },
            unit: { $literal: challenge.unit }
          }
        }
      ]);

      leaderboard = leaderboardData.map((item, index) => ({
        rank: index + 1,
        ...item
      }));
    }

    const isJoined = participantsList.some(p => p.toString() === userId.toString());
    const userProgress = leaderboard.find(l => l.userId.toString() === userid.toString());
    const currentDistance = userProgress ? userProgress.distance : 0.0;
    const now = new Date();
    const diffTime = new Date(challenge.endDate) - now;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    res.status(200).json({
      success: true,
      data: {
        id: challenge._id,
        title: challenge.title,
        description: challenge.description,
        targetDistance: challenge.targetDistance,
        currentDistance: currentDistance,
        unit: challenge.unit,
        daysLeft: daysLeft > 0 ? daysLeft : 0,
        participantsCount: challenge.participants.length,
        icon: challenge.icon,
        startDate: challenge.startDate,
        endDate: challenge.endDate,
        isJoined: isJoined,
        sponsor: challenge.sponsor,
        leaderboard: leaderboard.slice(0, 10)
      }
    });
  } catch (error) {
    console.error("Challenge Details Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching challenge details"
    });
  }
};

exports.joinChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Challenge Id"
      });
    }

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found!"
      });
    }

    const now = new Date();
    if (challenge.endDate < now) {
      return res.status(400).json({
        success: false,
        message: "This challenge has already ended"
      })
    }

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      { $addToSet: { participants: userId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        challengeId: updatedChallenge._id,
        isJoined: true,
        message: "Successfully joined challenge"
      }
    });
  } catch (error) {
    console.error("Error Joining Challenge:", error);
    res.status(500).json({
      success: false,
      message: "Server error while joining challenge"
    });
  }
};

exports.getChallengeLeaderboard = async (req, res) => {
  try {
    const { challengeId } = req.params;
    let { page = 1, limit = 50 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Challenge ID"
      });
    }

    const challenge = await Challenge.findById(challengeId).lean();
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found"
      })
    }

    const participantsList = Array.isArray(challenge.participants) ? challenge.participants : [];
    if (participantsList.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          leaderboard: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        }
      });
    }

    const leaderboardData = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: challenge.startDate, $lte: challenge.endDate },
          userId: { $in: participantsList }
        }
      },
      {
        $group: {
          _id: "$userId",
          totalDistance: { $sum: "$distance" }
        }
      },
      { $sort: { totalDistance: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "userInfo"
              }
            },
            { $unwind: "$userInfo" },
            {
              $project: {
                _id: 0,
                userId: "$_id",
                userName: { $concat: ["$userInfo.firstName", " ", "$userInfo.lastName"] },
                userAvatar: "$userInfo.profileImage",
                distance: { $round: ["$totalDistance", 1] },
                unit: { $literal: (challenge.unit || "km") }
              }
            }
          ]
        }
      },
    ]);

    const results = leaderboardData[0].data;
    const total = leaderboardData[0].metadata[0]?.total || 0;

    const leaderboard = results.map((item, index) => ({
      rank: skip + index + 1,
      ...item
    }));

    res.status(200).json({
      success: true,
      data: {
        leaderboard,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error("Leaderboard Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error fetching leaderboard"
    });
  }
};