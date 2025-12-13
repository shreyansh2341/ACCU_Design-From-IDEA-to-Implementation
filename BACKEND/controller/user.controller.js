const User = require("../model/user.model");
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');
const createAuthTokenAndSaveCookies = require('../jwt/authToken');
const { generateOTP, getOTPExpiry, sendOTPEmail, verifyOTP } = require('../utils/otpUtils');
const jwt = require('jsonwebtoken'); // for Google auth token signing
const { OAuth2Client } = require('google-auth-library');

// Temporary object to store user creds until OTP verified
let pendingUsers = {};
const pendingPasswordResets = {};

/**
 * REGISTER CONTROLLER
 */
// const register = async (req, res) => {
//   try {
//     const { name, email, password, role, phone, isGoogleSignup, picture } = req.body;

//     // ---------------- VALIDATION ----------------
//     if (isGoogleSignup) {
//       // Google signup → no password, requires name, email, role, phone, picture
//       if (!name || !email || !phone || !picture) {
//         return res
//           .status(400)
//           .json({ message: "Please fill all required fields for Google signup" });
//       }
//     } else {
//       // Manual signup → requires name, email, password, role, phone, photo
//       if (!req.files || !req.files.photo) {
//         return res.status(400).json({ message: "Photo is required" });
//       }

//       const { photo } = req.files;
//       const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//       if (!allowedTypes.includes(photo.mimetype)) {
//         return res
//           .status(400)
//           .json({ message: "Invalid file type. Only JPEG and PNG are allowed." });
//       }

//       if (!name || !email || !password || !phone) {
//         return res.status(400).json({ message: "Please fill all required fields" });
//       }
//     }

//     // ---------------- CHECK IF USER EXISTS ----------------
//     let user = await User.findOne({ email });
//     if (user) {
//       if (user.isEmailVerified) {
//         return res.status(400).json({ message: "User already exists" });
//       } else {
//         // Resend OTP for unverified user
//         const otp = generateOTP();
//         const otpExpiry = getOTPExpiry();

//         pendingUsers[email] = {
//           name,
//           email,
//           password: password ? await bcrypt.hash(password, 10) : user.password,
//           phone,
//           photo: user.photo,
//           role,
//           otp,
//           otpExpiry,
//           isGoogleSignup,
//         };

//         await sendOTPEmail(email, name, otp);

//         return res.status(200).json({
//           message: "User exists but email not verified. OTP re-sent.",
//           requiresVerification: true,
//           email,
//         });
//       }
//     }

//     // ---------------- PHOTO HANDLING ----------------
//     let photoData = null;

//     if (isGoogleSignup) {
//       // Google signup → use picture from Google
//       photoData = {
//         public_id: `google_${Date.now()}`,
//         url: picture,
//       };
//     } else {
//       // Manual signup → upload to Cloudinary
//       const { photo } = req.files;
//       const cloudinaryResponse = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "user_photos",
//             use_filename: true,
//             unique_filename: false,
//             overwrite: true,
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         );
//         stream.end(photo.data);
//       });

//       if (!cloudinaryResponse?.secure_url) {
//         return res.status(500).json({ message: "Cloudinary upload failed" });
//       }

//       photoData = {
//         public_id: cloudinaryResponse.public_id,
//         url: cloudinaryResponse.secure_url,
//       };
//     }

//     // ---------------- STORE PENDING USER ----------------
//     const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//     const otp = generateOTP();
//     const otpExpiry = getOTPExpiry();

//     pendingUsers[email] = {
//       name,
//       email,
//       password: hashedPassword, // null for Google users
//       phone,
//       photo: photoData,
//       role,
//       otp,
//       otpExpiry,
//       isGoogleSignup,
//     };

//     await sendOTPEmail(email, name, otp);
//     // await sendOTPPhone(phone, otp);  // optional

//     return res.status(201).json({
//       message: "OTP sent successfully to email. Please verify to complete registration.",
//       email,
//       requiresVerification: true,
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, isGoogleSignup, picture } = req.body;

    // ---------------- VALIDATION ----------------
    if (isGoogleSignup) {
      if (!name || !email || !phone || !picture) {
        return res.status(400).json({
          message: "Please fill all required fields for Google signup",
        });
      }
    } else {
      if (!req.files || !req.files.photo) {
        return res.status(400).json({ message: "Photo is required" });
      }

      const { photo } = req.files;
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(photo.mimetype)) {
        return res.status(400).json({
          message: "Invalid file type. Only JPEG and PNG are allowed.",
        });
      }

      if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "Please fill all required fields" });
      }
    }

    // ---------------- CHECK IF USER EXISTS ----------------
    let user = await User.findOne({ email });

    if (user) {
      if (user.isEmailVerified) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const otp = generateOTP();
        const otpExpiry = getOTPExpiry();

        pendingUsers[email] = {
          name,
          email,
          password: password ? await bcrypt.hash(password, 10) : user.password,
          phone,
          photo: user.photo,
          role,
          otp,
          otpExpiry,
          isGoogleSignup,
          isActive: true, // ✅ ensure active
        };

        await sendOTPEmail(email, name, otp);

        return res.status(200).json({
          message: "User exists but email not verified. OTP re-sent.",
          requiresVerification: true,
          email,
        });
      }
    }

    // ---------------- PHOTO HANDLING ----------------
    let photoData = null;

    if (isGoogleSignup) {
      photoData = {
        public_id: `google_${Date.now()}`,
        url: picture,
      };
    } else {
      const { photo } = req.files;
      const cloudinaryResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_photos" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(photo.data);
      });

      photoData = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    // ---------------- STORE PENDING USER ----------------
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    pendingUsers[email] = {
      name,
      email,
      password: hashedPassword,
      phone,
      photo: photoData,
      role,
      otp,
      otpExpiry,
      isGoogleSignup,
      isActive: true, // ✅ explicit
    };

    await sendOTPEmail(email, name, otp);

    return res.status(201).json({
      message: "OTP sent successfully to email. Please verify to complete registration.",
      email,
      requiresVerification: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * LOGIN CONTROLLER
 */
// const login = async (req, res) => {
//   const { email, password, role, isGoogleLogin, picture, name, phone } = req.body;

//   try {
//     if (!email) {
//       return res.status(400).json({ message: "Please provide email" });
//     }

//     // ----------------- MANUAL LOGIN -----------------
//     if (!isGoogleLogin) {
//       if (!password) {
//         return res.status(400).json({ message: "Password is required" });
//       }

//       const user = await User.findOne({ email }).select("+password");
//       if (!user) {
//         return res.status(404).json({
//           message: "User not registered. Please complete registration.",
//           requiresRegistration: true,
//           email,
//         });
//       }


//       if (!user.password) {
//         return res
//           .status(400)
//           .json({ message: "This account was created via Google. Use Google login." });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }

//       if (!user.isEmailVerified) {
//         // Resend OTP
//         const otp = generateOTP();
//         const otpExpiry = getOTPExpiry();

//         pendingUsers[email] = {
//           ...user.toObject(),
//           password: user.password, // keep hashed
//           otp,
//           otpExpiry,
//           isGoogleSignup: false,
//         };

//         await sendOTPEmail(user.email, user.name, otp);

//         return res.status(403).json({
//           message: "Email not verified. OTP sent again.",
//           requiresVerification: true,
//           email: user.email,
//         });
//       }

//       if (role && user.role !== role) {
//         return res
//           .status(403)
//           .json({ message: `Access denied. Expected role: ${user.role}` });
//       }

//       const token = await createAuthTokenAndSaveCookies(user._id, res);

//       return res.status(200).json({
//         success: true,
//         message: "Login successful",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//         token,
//       });
//     }

//     // ----------------- GOOGLE LOGIN -----------------
//     else {
//       let user = await User.findOne({ email });

//       if (!user) {
//         // Not registered yet → frontend should redirect to registration
//         return res.status(404).json({
//           message: "User not registered. Please complete registration.",
//           requiresRegistration: true,
//           email,
//           name,
//           phone,
//           picture,
//           role,
//         });
//       }

//       if (!user.isEmailVerified) {
//         // Resend OTP
//         const otp = generateOTP();
//         const otpExpiry = getOTPExpiry();

//         pendingUsers[email] = {
//           ...user.toObject(),
//           password: null, // Google user → no password
//           otp,
//           otpExpiry,
//           isGoogleSignup: true,
//         };

//         await sendOTPEmail(user.email, user.name, otp);

//         return res.status(403).json({
//           message: "Email not verified. OTP sent again.",
//           requiresVerification: true,
//           email: user.email,
//         });
//       }

//       if (role && user.role !== role) {
//         return res
//           .status(403)
//           .json({ message: `Access denied. Expected role: ${user.role}` });
//       }

//       const token = await createAuthTokenAndSaveCookies(user._id, res);

//       return res.status(200).json({
//         success: true,
//         message: "Google login successful",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//         token,
//       });
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };

const login = async (req, res) => {
  const { email, password, role, isGoogleLogin, picture, name, phone } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    // ================= MANUAL LOGIN =================
    if (!isGoogleLogin) {
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(404).json({
          message: "User not registered. Please complete registration.",
          requiresRegistration: true,
          email,
        });
      }

      // 🚫 BLOCK DEACTIVATED USERS
      if (!user.isActive) {
        return res.status(403).json({
          message: "Your account has been deactivated by admin. Please contact support.",
        });
      }

      if (!user.password) {
        return res.status(400).json({
          message: "This account was created via Google. Use Google login.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      if (!user.isEmailVerified) {
        const otp = generateOTP();
        const otpExpiry = getOTPExpiry();

        pendingUsers[email] = {
          ...user.toObject(),
          password: user.password,
          otp,
          otpExpiry,
          isGoogleSignup: false,
        };

        await sendOTPEmail(user.email, user.name, otp);

        return res.status(403).json({
          message: "Email not verified. OTP sent again.",
          requiresVerification: true,
          email: user.email,
        });
      }

      // Role check (optional / backward compatible)
      if (role && user.role !== role) {
        return res.status(403).json({
          message: `Access denied. Your role is ${user.role}`,
        });
      }

      const token = await createAuthTokenAndSaveCookies(user._id, res);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    }

    // ================= GOOGLE LOGIN =================
    else {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not registered. Please complete registration.",
          requiresRegistration: true,
          email,
          name,
          phone,
          picture,
          role,
        });
      }

      // 🚫 BLOCK DEACTIVATED USERS
      if (!user.isActive) {
        return res.status(403).json({
          message: "Your account has been deactivated by admin. Please contact support.",
        });
      }

      if (!user.isEmailVerified) {
        const otp = generateOTP();
        const otpExpiry = getOTPExpiry();

        pendingUsers[email] = {
          ...user.toObject(),
          password: null,
          otp,
          otpExpiry,
          isGoogleSignup: true,
        };

        await sendOTPEmail(user.email, user.name, otp);

        return res.status(403).json({
          message: "Email not verified. OTP sent again.",
          requiresVerification: true,
          email: user.email,
        });
      }

      if (role && user.role !== role) {
        return res.status(403).json({
          message: `Access denied. Your role is ${user.role}`,
        });
      }

      const token = await createAuthTokenAndSaveCookies(user._id, res);

      return res.status(200).json({
        success: true,
        message: "Google login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

/**
 * LOGOUT
 */
const logout = (req, res) => {
  try {
    res.clearCookie('jwt', { httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
};

/**
 * GET PROFILE
 */
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User profile found successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
  }
};

/**
 * GET ADMINS
 */
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: 'No admins found' });
    }
    res.status(200).json({ message: 'Admins found successfully', admins });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

/**
 * VERIFY OTP
 */
const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const pendingUser = pendingUsers[email];

    if (!pendingUser) {
      return res.status(404).json({
        message: "No pending registration found. Please register again.",
      });
    }

    // Validate OTP
    const isValidOTP = verifyOTP(otp, pendingUser.otp, pendingUser.otpExpiry);
    if (!isValidOTP) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        delete pendingUsers[email];
        return res.status(400).json({ message: "User already verified. Please login." });
      } else {
        existingUser.name = pendingUser.name;
        existingUser.password = pendingUser.password || existingUser.password;
        existingUser.phone = pendingUser.phone;
        existingUser.photo = pendingUser.photo;
        existingUser.role = pendingUser.role;
        existingUser.isEmailVerified = true;
        existingUser.isGoogleLogin = pendingUser.isGoogleSignup; // Make sure this is set!
        await existingUser.save();

        delete pendingUsers[email];
        const token = await createAuthTokenAndSaveCookies(existingUser._id, res);

        return res.status(200).json({
          message: "Email verified successfully. Registration complete!",
          user: {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          },
          token,
        });
      }
    }

    // Otherwise → create new user (after valid OTP)
    const userData = {
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password || undefined,
      phone: pendingUser.phone,
      photo: pendingUser.photo,
      role: pendingUser.role,
      isGoogleLogin: pendingUser.isGoogleSignup, // Set Google signup flag!
      isEmailVerified: true,
    };
    const user = new User(userData);
    await user.save();

    delete pendingUsers[email];
    const token = await createAuthTokenAndSaveCookies(user._id, res);

    res.status(200).json({
      message: "Email verified successfully. Registration complete!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};


/**
 * RESEND OTP
 */
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const pendingUser = pendingUsers[email];
    if (!pendingUser) {
      return res.status(404).json({ message: 'No pending registration found' });
    }

    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    pendingUser.otp = otp;
    pendingUser.otpExpiry = otpExpiry;

    await sendOTPEmail(email, pendingUser.name, otp);

    res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error resending OTP', error: error.message });
  }
};

/**
 * GOOGLE LOGIN
 */
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Google token is required' });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    // check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // 🚨 Stop here, do NOT create user
      return res.status(403).json({
        success: false,
        message: 'User not registered. Please sign up first.',
        googleData: { email, name, picture } // frontend can prefill
      });
    }

    // ✅ User exists, issue token
    const authToken = await createAuthTokenAndSaveCookies(user._id, res);

    return res.status(200).json({
      success: true,
      message: 'Google login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: authToken
    });

  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({
      success: false,
      message: 'Google login failed',
      error: error.message
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }

    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Store OTP and expiry in temporary store
    pendingPasswordResets[email] = { otp, otpExpiry, userId: user._id };

    await sendOTPEmail(email, user.name, otp);

    res.status(200).json({
      message: 'OTP sent to your email for password reset verification',
      email,
      requiresVerification: true,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Step 2: Verify OTP for password reset
const verifyPasswordResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const pendingReset = pendingPasswordResets[email];
    if (!pendingReset) {
      return res.status(404).json({ message: 'No pending password reset request found' });
    }

    const isValidOTP = verifyOTP(otp, pendingReset.otp, pendingReset.otpExpiry);
    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully', email });
  } catch (error) {
    console.error('Verify password reset OTP error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Step 3: Reset Password using verified OTP
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    const pendingReset = pendingPasswordResets[email];
    if (!pendingReset) {
      return res.status(404).json({ message: 'No pending password reset request found' });
    }

    const isValidOTP = verifyOTP(otp, pendingReset.otp, pendingReset.otpExpiry);
    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Clean up pending reset
    delete pendingPasswordResets[email];

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMyProfile,
  getAdmins,
  verifyOTPController,
  resendOTP,
  googleLogin,
  forgotPassword,
  resetPassword,
  verifyPasswordResetOtp
};
