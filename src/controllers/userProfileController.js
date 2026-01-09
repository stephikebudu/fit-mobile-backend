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

exports.updateUserSocialLinks = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed!"
      });
    }

    const userId = req.user.id;
    const body = req.body || {};
    console.log(req.body);
    const updateQuery = {};
    if (body.hasOwnProperty("tiktok")) updateQuery["socialLinks.tiktok"] = body.tiktok;
    if (body.hasOwnProperty("instagram")) updateQuery["socialLinks.instagram"] = body.instagram;
    if (body.hasOwnProperty("facebook")) updateQuery["socialLinks.facebook"] = body.facebook;
    if (body.hasOwnProperty("snapchat")) updateQuery["socialLinks.snapchat"] = body.snapchat;

    if (Object.keys(updateQuery).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No social links provided for update"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateQuery },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        socialLinks: {
          tiktok: (updatedUser.socialLinks && updatedUser.socialLinks.tiktok) || "",
          instagram: (updatedUser.socialLinks && updatedUser.socialLinks.instagram) || "",
          facebook: (updatedUser.socialLinks && updatedUser.socialLinks.facebook) || "",
          snapchat: (updatedUser.socialLinks && updatedUser.socialLinks.snapchat) || ""
        }
      }
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating social links"
    });
  }
}

exports.updateUserAddress = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed!"
      });
    }

    const userId = req.user.id;
    const body = req.body || {};
    let updateQuery = {};

    if (body.address && typeof body.address === "string") {
      updateQuery = {
        "address.shopAddress": body.address,
        "address.country": "",
        "address.state": "",
        "address.city": "",
        "address.landmark": ""
      };
    } else {
      const fields = ["country", "state", "city", "shopAddress", "landmark"];
      fields.forEach(field => {
        if (body.hasOwnProperty(field)) {
          updateQuery[`address.${field}`] = body[field];
        }
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateQuery },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in database search!"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        address: {
          country: updatedUser.address?.country || "",
          state: updatedUser.address?.state || "",
          city: updatedUser.address?.city || "",
          shopAddress: updatedUser.address?.shopAddress || "",
          landmark: updatedUser.address?.landmark || ""
        }
      }
    });
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating user address"
    });
  }
}

exports.updateUserBankDetails = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed!"
      });
    }

    const userId = req.user.id;
    const body = req.body || {};

    const updateQuery = {};
    if (body.hasOwnProperty("accountType")) updateQuery["bankDetails.accountType"] = body.accountType;
    if (body.hasOwnProperty("bankName")) updateQuery["bankDetails.bankName"] = body.bankName;
    if (body.hasOwnProperty("accountNumber")) updateQuery["bankDetails.accountNumber"] = body.accountNumber;
    if (body.hasOwnProperty("accountName")) updateQuery["bankDetails.accountName"] = body.accountName;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateQuery },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found oin database search!"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        bankDetails: {
          accountType: updatedUser.bankDetails?.accountType || "",
          bankName: updatedUser.bankDetails?.bankName || "",
          accountNumber: updatedUser.bankDetails?.accountNumber || "",
          accountName: updatedUser.bankDetails?.accountName || ""
        }
      }
    });
  } catch (error) {
    console.error("Bank Details Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating user's bank details"
    });
  }
}