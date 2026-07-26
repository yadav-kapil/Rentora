const express = require('express');
const {getMe, postLogin, postSignUp , postLogout} = require('../controllers/user.controller');

const { signupSchemaValidation, loginSchemaValidation } = require('../validators/user.validator');
const validate = require('../middlewares/validate.middleware');
const requireAuth = require('../middlewares/requireAuth.middleware');

const router = express.Router();

router.get("/me",requireAuth ,getMe)

router.post('/login',validate(loginSchemaValidation), postLogin);

router.post('/signup', validate(signupSchemaValidation), postSignUp);

router.post("/logout", postLogout)

module.exports = router;