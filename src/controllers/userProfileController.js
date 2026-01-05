const User = require("../../src/models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User found!",
      data: {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        username: existingUser.username,
        email: existingUser.email,
        phone: existingUser.phone,
        bio: existingUser.bio,
        gender: existingUser.gender,
        role: existingUser.role,
        profileImage: existingUser.profileImage,
        socialLinks: existingUser.socialLinks,
        address: existingUser.address,
        bankDetails: existingUser.bankDetails,
        verified: existingUser.verified,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Server error fetching user profile"
    });
  }
}

exports.updateUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed: ID not found in request"
      })
    }

    const userId = req.user.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        gender: updatedUser.gender,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        socialLinks: updatedUser.socialLinks,
        address: updatedUser.address,
        bankDetails: updatedUser.bankDetails,
        verified: updatedUser.verified,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      }
    })
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile"
    });
  }
}