// backend/routes/api/users.js
const express = require('express')
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// added
// const {Spot, Review, Image, User, sequelize} = require('../db/models')

// changed this
// this gets pooled into an array in handleValidationErrors
//
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),
    check('firstName')
      .exists({checkFalsy:true})
      .withMessage('First name is required'),
    check('lastName')
      .exists({checkFalsy:true})
      .withMessage('Last Name is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required.'),
    handleValidationErrors
  ];
// get all spots owned by user
router.get('/:userId/spots', requireAuth, async (req, res, next)=>{
  console.log('in userId spots route')
  const spots = await User.findAll({
    attributes: [],
    include: {model: Spot},
    where: {id: req.params.userId}
  })
  res.json(...spots)
})




// this is for signup
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, password, firstName, lastName } = req.body;
      const userObj = {}

      // first check if email is already in DB
      let record = await User.findAll({where:{email}})

      if (record.length>0){
        let err = new Error("user with that email already exists")
        next(err);
      }

      const user = await User.signup({ email, firstName, lastName, password });
      await setTokenCookie(res, user);

      console.log('user object:', user)

      userObj.id = user.id
      userObj.firstName = user.firstName
      userObj.lastName = user.lastName
      userObj.email = user.email
      userObj.token = ''
      if (user){
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        return res.json({
          userObj
        });
      }

      // if incorrect inputs
      // this part is done already by ValidateSignup
      // ValidateSignup will check validity of data, but NOT whether it already exists in DB
      // if (!firstName || !lastName || !email){
        //....
      // }

    }
  );


  router.get('/currentUser', requireAuth, async (req,res, next)=>{
    // requireAuth is a 2 part array of middlewares for authentication
    console.log("Req.user: ", req.user)
    let currentUser= await AppUser.findAll({where: {id: req.user}})
    res.json({currentUser})
  });




module.exports = router;
