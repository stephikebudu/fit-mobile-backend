const { doHash, doHashValidation } = require("../../src/utils/hashing");
const { signupSchema, signinSchema } = require("../../src/middleware/validator");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const { error, value } = signupSchema.validate({ email, password, firstName, lastName, role });

    if (error) {
      return res.status(401).json({ success: false, message: error.details[0].message });
    }

    const hashedPassword = await doHash(password, 12);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    })
    const data = await newUser.save();
    data.password = undefined;
    res.status(201).json({
      success: true,
      message: "Your account has been successfully created",
      data,
    })
  } catch (error) {
    console.error("Could not register user ===", error.message);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error, value } = signinSchema.validate({ email, password })
    if (error) {
      return res.status(401).json({ success: false, message: error.details[0] });
    }

    const existingUser = await User.findOne({ email }).select("+password")
    if (!existingUser) {
      console.log("No existing user ====== ")
      return res.status(401).json({ success: false, message: "User does not exist!" })
    }

    const result = await doHashValidation(password, existingUser.password)
    if (!result) {
      return res.status(401)
        .json({ success: false, message: "Invalid credentials!" })
    }

    const token = jwt.sign({
      userId: existingUser._id,
      email: existingUser.email,
      verified: existingUser.verified,
    },
      process.env.TOKEN_SECRET,
      { expiresIn: "8h" }
    );

    res
      .cookie("Authorization", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production"
      })
      .json({
        success: true,
        token,
        message: "Sign in successful!"
      })
  } catch (error) {
    console.log(error)
  }
};

exports.signout = async (req, res) => {
  res.clearCookie("Authorization")
    .status(200)
    .json({
      success: true,
      message: "Sign out successful!"
    });
}