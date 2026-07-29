const express = require('express');
const { upload } = require('../config/cloudinary.config');
const { getMe, postLogin, postSignUp, postLogout, updateProfile, changePassword } = require('../controllers/user.controller');

const { signupSchemaValidation, loginSchemaValidation } = require('../validators/user.validator');
const validate = require('../middlewares/validate.middleware');
const requireAuth = require('../middlewares/requireAuth.middleware');

const router = express.Router();

router.get("/me", requireAuth, getMe);

router.post('/login', validate(loginSchemaValidation), postLogin);

router.post('/signup', validate(signupSchemaValidation), postSignUp);

router.post("/logout", postLogout);

router.patch("/profile", requireAuth, upload.single("dp"), updateProfile);

router.patch("/change-password", requireAuth, changePassword);

module.exports = router;