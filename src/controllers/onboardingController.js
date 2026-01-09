const Activity = require("../../src/models/Activity");
const User = require("../../src/models/User");

exports.getActivitiesList = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ name: 1 }).lean();
    const formattedData = activities.map(activity => ({
      id: activity._id,
      name: activity.name,
      icon: activity.icon
    }));

    res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error("Fetch Activities Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching list of activities"
    });
  }
}

exports.saveUserActivities = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed!"
      });
    }

    const userId = req.user.id;
    const { activityIds } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { selectedActivities: activityIds } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in database search!"
      });
    }

    res.status(200).json({
      success: true,
      message: "Activities saved successfully"
    })
  } catch (error) {
    console.error("Save User Activities Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving activities"
    });
  }
}