const { saveUserActivitiesSchema } = require("../../src/middleware/validator");

exports.validateSaveUserActivities = (req, res, next) => {
  const { error } = saveUserActivitiesSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
}