const express = require('express');
const app = require('../../app');
// added here
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors,  handleDateConflictErrors } = require('../../utils/validation');
const { check } = require('express-validator');


const router = express.Router();

const {Spot, Review, Image, User, Booking, sequelize} = require('../../db/models');
const review = require('../../db/models/review');
const booking = require('../../db/models/booking');

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({checkFalsy:true})
      .withMessage('City is required'),
    check('state')
      .exists({checkFalsy:true})
      .withMessage('State is required'),
    check('country')
      .exists({checkFalsy:true})
      .withMessage('Country is required'),
    check('lat')
      .exists({checkFalsy:true})
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({checkFalsy:true})
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({checkFalsy:true})
      .isLength({max:50})
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({checkFalsy:true})
      .withMessage("Description is required"),
    check('price')
      .exists({checkFalsy:true})
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];

const validateReview= [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
    check('stars')
    .exists({checkFalsy:true})
    .custom( value=>{
        if (value<1 || value>5 || typeof Number(value)!=="number"){
            throw new Error('Stars must be an integer from 1 to 5')
        }
        return true
    }),
    handleValidationErrors
]

// added in the edit booking endpoint
const validateBooking  = [
    check('startDate')
    .exists({checkFalsy: true})
    .withMessage("Must provide valid startDate"),
    check('endDate')
    .exists({checkFalsy: true}),
    check('endDate')
    .exists({checkFalsy: true})
    .custom((value, {req}) =>{
        if (value < req.body.startDate){
            throw new Error("endDate cannot come before startDate")
        }
        return true
    }),
    handleValidationErrors
]

// handling the create booking for spotid (specifically existing dates)
// send to another middleware for ANOTHER UNIQUE error handling
const validateBookingDatesExisting= [
    check('startDate')
    .exists({checkFalsy: true})
    .custom(async (value, {req,res,next}) =>{
        let spot = await Spot.findOne({include: {model:Booking},
            where: {id: req.params.spotId}
        })
        for (let i =0; i< spot.Bookings.length; i++){
            let booking = spot.Bookings[i]
            if (booking.startDate === value){
                // this error message does not pass into validationResults
                // had to create msg manually
                return Promise.reject('Start date conflict with an existing booking !!!')
            }
        }
        return true
    }),
    check('endDate')
    .exists({checkFalsy: true})
    .custom(async(value, {req, res, next}) =>{
        let spot = await Spot.findOne({include: {model:Booking},
            where: {id: req.params.spotId}
        })
        for (let i =0; i< spot.Bookings.length; i++){
            let booking = spot.Bookings[i]
            if (booking.endDate === value){
                return Promise.reject('End date conflict with an existing booking')
            }
        }
        return true
    }),
    handleDateConflictErrors
]

router.delete('/:spotId/bookings/:bookingId', requireAuth, async (req, res,next)=>{
    let booking = await Booking.findOne({where: {userId: req.user.id,
         spotId: req.params.spotId,
         id: req.params.bookingId
    }})
    // authorization required
    if (booking.userId != req.user.id){
        res.statusCode = 403;
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    let today = new Date();
    let startingDate = new Date(booking.startDate)

    if (!booking){
        req.statusCode = 404
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    if (today > startingDate){
        // you cannot delete a booking date past start date
        res.statusCode = 400
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 400
        })
    }
    await booking.destroy()
    res.statusCode = 200
    res.send({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

router.patch('/:spotId/bookings/:bookingId',
    requireAuth,
    validateBooking,
    validateBookingDatesExisting,
        async (req, res, next)=>{

            const booking = await Booking.findAll({
                where: {userId: req.user.id, spotId: req.params.spotId, id: req.params.bookingId}
            })
            if (!booking){
                res.statusCode = 404
                res.json({
                    "message": "Booking couldn't be found",
                    "statusCode": 404
                })
            }
            let today = new Date();
            let bookingDate = new Date(booking.endDate)
            if (bookingDate < today){
                // if booking is in the past
                res.statusCode = 404;
                res.json({
                    "message": "Past bookings can't be modified",
                    "statusCode": 400
                })
            }
            const {startDate, endDate} = req.body
            booking.startDate = startDate
            booking.endDate = endDate
            await booking.save()
            res.json(booking)

});

// QUESTION: authorization part.. i cannot book a spot if i own it?
// i thought that getting all bookings for a spot based on id implies that its ok?
router.post('/:spotId/bookings', requireAuth, validateBooking, validateBookingDatesExisting, async(req,res,next)=>{
    let spot = await Spot.findOne({include: {model:Booking},
        where: {id: req.params.spotId}
    })
    // res.json(spot)

    // let spot = await Spot.findOne({include: {model:Booking},
    //     where: {id: req.params.spotId}
    // })
    if (!spot){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const {startDate, endDate} = req.body

    let newRecord = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    })
    res.json(newRecord)

});


// get bookings booked by user for a given spot
router.get('/:spotId/bookings', requireAuth, async(req, res, next)=>{
    let bookings = await Booking.findAll({
      include: [{model: Spot}, {model:User, attributes:
         {exclude: ['email', 'hashedPassword', 'createdAt', 'updatedAt']}}],
      where: {userId: req.user.id, spotId: req.params.spotId}
    });

    if (!bookings.length){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    // if im checking the bookings for my own place
    // apparently as the owner, i can book my own place
    // if im the owner (req.user.id = bookings.spots.ownerId)


    for (let i = 0; i<bookings.length; i++){
      let booking = bookings[i].toJSON()
      if (booking.Spot.ownerId === req.user.id){
        // console.log('owner is true')
        delete booking.Spot
      }
      else {
        // booking a different place
        delete booking.Spot
        delete booking.User
        for (key in booking){
          if (key!='spotId' && key!='startDate' && key!= 'endDate'){
            delete booking[key]
          }
        }
      }
      bookings[i] = booking
    }

    res.json({bookings})
  })


router.post('/:spotId/reviews', requireAuth, validateReview , async (req, res, next)=>{
    // first check if spot Id is valid
    const spot = await Spot.findOne({ include: {model:Review},where: {id: req.params.spotId}})
    if (!spot){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    // search through reviews, check if the userId of review is the same as current user
    // if so, you cannot write another review
    // console.log("reviews array: ", spot.Reviews)
    for (let i = 0; i< spot.Reviews.length; i++){
        let review = spot.Reviews[i]
        if (review.userId === req.user.id){
            res.statusCode = 403
            return res.json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            })
        }
    }
    const {review, stars} = req.body
    let newReview = await Review.create({userId: req.user.id, spotId: req.params.spotId , review, stars})
    res.json(newReview)

});

router.get('/:spotId/reviews', async (req,res, next)=>{
    let reviews = await Review.findAll({
        include: [
        {model: User, attributes: {exclude: ['createdAt', 'updatedAt', 'email', 'hashedPassword']}},
        {model: Image, attributes: ['url']},
        {model: Spot, attributes: {exclude: ['description', 'createdAt', 'updatedAt', 'previewImage']}}
    ],
        where: {spotId: req.params.spotId}
    })
    if (!reviews.length){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.statusCode = 200
    res.json({
        reviews
    })
})


router.delete('/:spotId', requireAuth, async (req,res,next)=>{
    let spot = await Spot.findOne({where: {id: req.params.spotId, ownerId: req.user.id}})
    if (spot){
        await spot.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
    else {
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
})



router.patch('/:spotId', requireAuth, validateSpot, async (req, res, next)=>{
    const {address, city, state, country, lat, lng, name, description, price}= req.body
    // check to see if spotId is correct for req.user.id
    // console.log('req.body: ', req.body)
    const spot = await Spot.findOne({where: {ownerId: req.user.id, id: req.params.spotId}})
    if (spot){
        // it is the owner's property
        spot.address = !address? spot.address: address
        spot.city = !city? spot.city: city
        spot.state = !state? spot.state: state
        spot.country = !country? spot.country: country
        spot.lat = !lat? spot.lat: lat
        spot.lng = !lng? spot.lng: lng
        spot.name = !name? spot.name: name
        spot.description = !description? spot.description: description
        spot.price = !price? spot.price: price

        await spot.save()
        res.json(spot)
    }
    // authorization is required
    if (!spot) {
        // doesnt belong to current user
        let error = new Error('Spot couldnt be found')
        error.status = 404
        res.json({"message": error.message, "statusCode": error.status})
    }

    if (req.user.id!= spot.ownerId){
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }

})


router.post('/', requireAuth, validateSpot, async (req,res, next)=>{
    const {address, city, state, country, lat, lng, name, description, price}= req.body
    let newSpot = await Spot.create({ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price})
    res.statusCode=201
    let newRecord = await Spot.findOne({attributes: {exclude: ['previewImage']}, where: {id: newSpot.id}})
    return res.json(newRecord)
});

router.get('/:spotId', async (req, res, next)=>{

    let spot = await Spot.findOne({
        where: {id: req.params.spotId},
        include:
        [
            {model: Review, attributes:[]},
            {model: Image, attributes: ['url']},
            {model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']},
        ]
    });

    if (!spot){
        // let error = new Error('sorry spot Id does not exist')
        res.statusCode=404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
        // next(error)
    }
    let newSpot = spot.toJSON()
    let countReviews = await Review.count({include: {model: Spot, where: {id: req.params.spotId}}})
    let totalScore = await Review.sum('stars',  {where: {spotId: req.params.spotId}})

    newSpot.numReviews= countReviews
    newSpot.avgStarRating = (totalScore/countReviews).toFixed(2)

    res.json(newSpot)
});

router.get('/', async(req, res, next)=>{
    let spots = await Spot.findAll();
    res.json(spots)
});


module.exports = router;
