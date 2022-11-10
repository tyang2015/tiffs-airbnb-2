// backend/routes/api/users.js
const express = require('express')
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors} = require('../../utils/validation');
const review = require('../../db/models/review');

// added

// this gets pooled into an array in handleValidationErrors

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

router.get('/bookings', requireAuth, async (req, res, next)=>{
  let bookings = await Booking.findAll({include: {model:Spot, include: {model:Image}}, where: {userId: req.user.id}})
  // let newbookings = bookings.toJSON()
  // let spotIds = bookings.map(booking => booking.Spot.id)
  // let images = await Image.findAll({where: {[Op.in] :spotIds}})

  // for (let i=0; i<bookings.length; i++){
  //   let booking = bookings[i]
  //   if (booking.Spot.id === )
  // }
  res.json({bookings})
});


// get reviews written by user
router.get('/reviews', requireAuth, async (req, res, next)=>{
  let reviewObj = {}
  let reviews = await Review.findAll({
    include: [{model: User}, {model: Spot}, {model: Image, attributes: ['url']}],
    where: {id: req.user.id}
  })
  reviewObj.Reviews = reviews
  res.json(reviewObj)

});

// get all spots owned by user
router.get('/spots', requireAuth, async (req, res, next)=>{
  // console.log('in userId spots route')
  const spots = await User.findAll({
    attributes: [],
    include: {model: Spot},
    where: {id: req.user.id}
  })
  res.json(...spots)
})

// this is for signup
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, password, firstName, lastName } = req.body;
      // const userObj = {}

      // first check if email is already in DB
      let record = await User.findAll({where:{email}})

      if (record.length>0){
        // let err = new Error("user with that email already exists")
        // next(err);
        res.statusCode = 403
        res.json({
          "message": "User already exists",
          "statusCode": res.statusCode,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }

      const user = await User.signup({ email, firstName, lastName, password });
      setTokenCookie(res, user);

      // userObj.id = user.id
      // userObj.firstName = user.firstName
      // userObj.lastName = user.lastName
      // userObj.email = user.email
      // userObj.token = ''

      if (user){
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        return res.json(
          user
        );
      }

      // if incorrect inputs
      // this part is done already by ValidateSignup
      // ValidateSignup will check validity of data, but NOT whether it already exists in DB
      // if (!firstName || !lastName || !email){
        //....
      // }

    }
  );

  // /currentUser

  router.get('/', requireAuth, async (req,res, next)=>{
    // requireAuth is a 2 part array of middlewares for authentication
    // console.log("Req.user: ", req.user)
    let currentUser= await User.findOne({where: {id: req.user.id}})
    res.json({currentUser})
  });




module.exports = router;
