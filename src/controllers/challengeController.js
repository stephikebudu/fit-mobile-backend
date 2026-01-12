const Challenge = require("../../src/models/Challenge");

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
          totalPages: Math.ceil(total/limit)
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
}