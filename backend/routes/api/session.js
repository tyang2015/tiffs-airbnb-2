// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
// phase 5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

// customize this to match the error message below
// the "check" checks the req.body keys!
const validateLogin = [
    check('email')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
  ];


router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const {email, password} = req.body
      // console.log('req body:', req.body)

      // this will simply query from the DB
      const user = await User.login({ credential:email, password });
      // if no account found in DB from scope method
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.message = 'Invalid credentials'
        err.errors = ['The provided credentials were invalid.'];
        // im using res.json because idk how to send to
        // correct error handler in app.js
        // res.statusCode = 401
        // return res.json({
        //   "message": "Invalid credentials",
        //   "statusCode": 401
        // })
        return next(err);
      }

      // after user is successfully retrieved from DB and logged in
      await setTokenCookie(res, user);
      res.statusCode=200
      res.setHeader('Content-type', 'application/json')
      return res.json({
        user
      });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;
