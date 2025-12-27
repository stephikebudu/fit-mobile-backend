const { doHash, doHashValidation, hmacProcess } = require("../../src/utils/hashing");
const { signupSchema, signinSchema } = require("../../src/middleware/validator");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");
const { transport } = require("../../src/middleware/sendMail");

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

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User does not exist!"
        });
    }

    if (existingUser.verified) {
      return res
        .status(400)
        .json({
          success: true,
          message: "You are already verified!"
        });
    }

    const codeValue = (Math.floor(Math.random() * 10000)).toString();

    let info = await transport.sendMail({
      from: process.env.NODE_VERIFICATION_CODE_EMAIL,
      to: existingUser.email,
      subject: "Fit Mobile: Verify Your Email",
      html: "<h1>" + codeValue + "</h1>"
    });

    if (info.accepted[0] === existingUser.email) {
      const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)
      existingUser.verificationCode = hashedCodeValue;
      existingUser.verificationCodeValidation = Date.now();
      await existingUser.save();
      return res.status(200).json({ success: true, message: "Verification code sent!" })
    }
    res.status(400).json({ success: false, message: "Code not sent, try again."})
  } catch (error) {
    console.log(error);
  }
}

exports.verifyVerificationCode = async (req, res) => {
  const { email, providedCode } = req.body;
  try {
    const { error, value } = acceptedCodeSchema.validate({ email, providedCode });
    if (error) {
      return res.status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const codeValue = providedCode.toString();
    const existingUser = await User.findOne({ email }).select("+verificationCode+verificationCodeValidation");

    if (!existingUser.verified) {
      return res.status(401)
                .json({ success: false, message: "User does not exist!" })
    }

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already verified!" });
    }

    if (!existingUser.verificationCode || !existingUser.verificationCodeValidation) {
      return res.status(400)
        .json({ success: false, message: "Something is wrong with verification code!" });
    }

    if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
      return res.status(400)
        .json({ success: false, message: "Code has expired!" });
    }

    const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)

    if (hashedCodeValue === existingUser.verificationCode) {
      existingUser.verified = true;
      existingUser.verificationCode = undefined;
      existingUser.verificationCodeValidation = undefined;
      await existingUser.save();

      return res.status(200)
        .json({ success: true, message: "User account has been verified!" })
    }

    return res.status(400).json({ success: false, message: "Unexpected occurred!" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "The worst case scenario has literally happened :/" })
  }
}