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