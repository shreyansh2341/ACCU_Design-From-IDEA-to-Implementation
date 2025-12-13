// const User = require('../model/user.model');
// const jwt = require('jsonwebtoken');

// const authenticatedUser = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         if (!token) {
//             console.log();
//             return res.status(401).json({ message: 'Unauthorized access' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded) {
//             return res.status(401).json({ message: 'Invalid token' });
//         }

//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error('Authentication error:', error);
//         res.status(401).json({ message: 'User not authenticated', error: error.message });
//     }
// }

// const isAdmin = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: `User with given role ${req.user.role} is not allowed` });
//         }
//         next();
//     };
// };

// module.exports = {
//     authenticatedUser,
//     isAdmin
// };

const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

const authenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 🚫 BLOCK DEACTIVATED USERS
    if (!user.isActive) {
      return res.status(403).json({
        message: 'Your account has been deactivated by admin.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      message: 'User not authenticated',
      error: error.message,
    });
  }
};

const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `User with role ${req.user.role} is not allowed` });
    }
    next();
  };
};

module.exports = {
  authenticatedUser,
  isAdmin,
};
