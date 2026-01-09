const Activity = require("../../src/models/Activity");

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