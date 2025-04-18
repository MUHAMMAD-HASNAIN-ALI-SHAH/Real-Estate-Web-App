const express = require('express');
const { register, login, verify, logout, profile, getProfileData } = require('../controllers/user.controller');
const { protectedRoute } = require('../middlewares/auth.middleware');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const router = express.Router();

router.route('/register').post(registerValidator,register);
router.route('/login').post(loginValidator,login);
router.route('/verify').get(protectedRoute,verify);
router.route('/logout').get(protectedRoute,logout);
router.route('/profile').post(protectedRoute,profile);
router.route('/profile').get(protectedRoute,getProfileData);

module.exports = router;
