const User = require("../Models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../Services/authentication");

async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,        // MUST stay false in localhost
      sameSite: "lax",      // 🔥 IMPORTANT FIX (CHANGE BACK)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
      .status(201)
      .json({
        message: "Signup successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,        // MUST stay false in localhost
      sameSite: "lax",      // 🔥 IMPORTANT FIX (CHANGE BACK)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

function logout(req, res) {
  res
    .clearCookie("token")
    .json({
      message: "Logged out",
    });
}

function currentUser(req, res) {
  res.json(req.user);
}

module.exports = {
  signup,
  login,
  logout,
  currentUser,
};