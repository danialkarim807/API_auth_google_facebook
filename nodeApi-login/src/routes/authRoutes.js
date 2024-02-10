// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const { secretKey } = require('../config/jwt');

router.post('/register', authController.register);
router.post('/googleUser',authController.registerGoogleUser);
router.post('/facebookUser',authController.registerFacebookUser);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.send({ result: ` ${err} not invalid` });
        } else {
            res.json({
                message: "Login success",
                authData
            });
        }
    });
});

module.exports = router;
