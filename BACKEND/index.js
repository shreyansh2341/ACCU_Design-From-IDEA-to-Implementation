const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const cookieparser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('dotenv').config();


// ---------- ROUTES ----------
const userRouter = require('./routes/userrouter.js'); 
const googleAuthRouter = require('./routes/googleAuth.routes'); 
const blogRouter = require('./routes/blogroute');
const mediaRouter = require('./routes/mediaroute');
const driveUploadRoute = require('./routes/driveUploadRoute');
const testimonialsrouter = require('./routes/testimonialsroute');
const emailRouter = require('./routes/emailroute');
const googleRouter = require('./routes/googleAuth.routes.js');

// ---------- PASSPORT CONFIG ----------
require('./config/passport-config.js'); // Google OAuth strategy

const app = express();

// ---------- MIDDLEWARES ----------

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Determine frontend origin based on environment
let origin_header = process.env.ENV === 'DEV' ? 'http://localhost:5173' : process.env.FRONTEND_URL;
console.log(`CORS Origin Set To: ${origin_header}`);

// CORS setup
app.use(cors({
  origin: origin_header,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Security headers
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year
  includeSubDomains: true,
  preload: true,
}));

// Cookie parser
app.use(cookieparser());

// File upload middleware
app.use(fileUpload({ useTempFiles: false }));

// ---------- PASSPORT ----------
app.use(passport.initialize());

// ---------- ROUTES ----------
app.use('/api/user', userRouter);       // Email/password + optional Google login
app.use('/api/google', googleAuthRouter); // Dedicated Google OAuth routes
app.use('/api/blog', blogRouter);
app.use('/api/media', mediaRouter);
app.use('/api/testimonials', testimonialsrouter);
app.use('/api/drive', driveUploadRoute);
app.use('/api/email', emailRouter);
app.use('/api', googleRouter); // Google auth routes

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    url: req.originalUrl
  });
});

// ---------- CLOUDINARY CONFIG ----------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// ---------- DATABASE CONNECTION ----------
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ---------- SERVER START ----------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is running at port: ${port}`);
});
