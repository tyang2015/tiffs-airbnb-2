const express = require('express');
const app = require('../../app');
// added here
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors,  handleDateConflictErrors } = require('../../utils/validation');
const { check, query } = require('express-validator');


const router = express.Router();

const {Spot, Review, Image, User, Booking, sequelize} = require('../../db/models');
const {Op} = require('sequelize')
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

// TO DO: FIX MIDDLEWARE TO SEE WHATS WRONG
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

const validateSpotQuery = [
    query('page')
      .isInt({min:0})
      .optional({checkFalsy: true})
      .withMessage("Page must be greater than or equal to 0"),
    query('size')
      .isInt({min:0})
      .optional({checkFalsy: true})
      .withMessage("Size must be greater than or equal to 0"),
    query('maxLat')
      .isFloat({min:-90, max: 90})
      .optional({checkFalsy: true})
      .withMessage("Maximum latitude is invalid"),
    query('minLat')
      .isFloat({min:-90, max: 90})
      .optional({checkFalsy: true})
      .withMessage("Minimum latitude is invalid"),
    query('maxLng')
        .isFloat({min:-180, max: 180})
        .optional({checkFalsy: true})
        .withMessage("Maximum longitude is invalid"),
    query('minLng')
        .isFloat({min:-180, max: 180})
        .optional({checkFalsy: true})
        .withMessage("Minimum latitude is invalid"),
    query('minPrice')
      .isFloat({min:0.01})
      .optional({checkFalsy: true})
      .withMessage("Minimum price must be greater than 0"),
    query('maxPrice')
      .isFloat({min:0.01})
      .optional({checkFalsy: true})
      .withMessage("Max price must be greater than 0"),
      handleValidationErrors
]

// add an image to a spot based on the spot's id
router.post('/:spotId/images', requireAuth, async (req,res,next)=>{
    let reviewId = null;
    const {url} = req.body
    console.log("user id:", req.user.id )
    let spot = await Spot.findOne({
        include: [{model: Review}],
        where: {id: req.params.spotId}
    });
    // there should only be either 0 or 1 item in Reviews array
    // bc you can only leave 1 review for a spot
    // res.json(spot)
    if (!spot){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId != req.user.id){
        res.statusCode = 403
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    // if (spot.user)
    // for (let i =0 ; i<spot.Reviews.length; i++){
    //     let review = spot.Reviews[i]
    //     if (review.userId == req.user.id){
    //         ownerReviewId = review.userId
    //     }
    // }
    if (spot.Reviews.length){
        reviewId = spot.Reviews[0].id
    }
    let newImage = await Image.create({
        spotId: req.params.spotId,
        reviewId,
        url
    })
    res.json({
        newImage
    })

});

router.delete('/bookings/:bookingId', requireAuth, async (req, res,next)=>{
    let booking = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    })
    // res.json(booking)

    if (!booking){
        req.statusCode = 404
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

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
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

// changed endpoint
router.patch('/bookings/:bookingId',
    requireAuth,
    validateBooking,
    // validateBookingDatesExisting,
        async (req, res, next)=>{

            const booking = await Booking.findOne({
                where: { id: req.params.bookingId},
                include: {model:Spot}
            })
            // res.json(booking)

            // not found
            if (!booking){
                res.statusCode = 404
                res.json({
                    "message": "Booking couldn't be found",
                    "statusCode": 404
                })
            }
            // authorization issue
            if (booking.userId != req.user.id){
                res.statusCode = 403
                res.json({
                    "message": "Forbidden",
                    "statusCode": 403
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

            // check existing dates here for error handling
            let errors = {}
            errors.message = "Sorry, this spot is already booked for the specified dates"
            errors.statusCode = 403
            errors.errors = {}
            let existingStart = false
            let existingEnd = false
            if (booking.startDate === startDate){
                existingStart = true
                errors.errors.startDate = "Start date conflicts with an existing booking"
            }
            if (booking.endDate === endDate){
                existingEnd = true
                errors.errors.endDate = "End date conflicts with an existing booking"
            }
            if (existingStart && existingEnd){
                res.statusCode = 403
                res.json({
                    ...errors
                })
            }

            booking.startDate = startDate
            booking.endDate = endDate
            await booking.save()
            res.json(booking)

});


router.post('/:spotId/bookings', requireAuth, validateBooking, async(req,res,next)=>{
    let spot = await Spot.findOne({include: {model:Booking},
        where: {id: req.params.spotId}
    })
    // added here
    let images = await Image.findAll({
        // include: {model: Spot},
        where: {spotId: req.params.spotId}
    })
    // res.json(images)
    if (!spot){
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const {startDate, endDate} = req.body

    // do error handling for existing dates here
    let errors = {}
    errors.message = "Sorry, this spot is already booked for the specified dates"
    errors.statusCode = 403
    let existingStart = false
    let existingEnd = false
    errors.errors = {}
    for (let i =0; i< spot.Bookings.length; i++){
        let booking = spot.Bookings[i]
        if (booking.startDate === startDate){
            existingStart = true
            errors.errors.startDate = "Start date conflicts with an existing booking"
        }
        if (booking.endDate === endDate){
            existingEnd = true
            errors.errors.endDate = "End date conflicts with an existing booking"
        }
    }
    if (existingStart || existingEnd){
        res.statusCode = 403
        res.json({
            ...errors
        })
    }

    let newRecord = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    })
    let ans = newRecord.toJSON()
    // newRecord.Spot = spot
    // let ans = await Booking.findByPk(newRecord.id, {
    //     include: [Spot]
    // })
    ans.Spot= spot
    ans.Images= images
    console.log('New record:', newRecord)
    res.json(ans)

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

router.get('/' , validateSpotQuery,async(req, res, next)=>{
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query
    // console.log("req.query:", req.query)
    // const spotIds = []
    let pagination ={};
    where = {};
    let spots;
    let numReviews =[];
    let scores = [];
    // where: { lat: {[Op.gte]: minLat }, }
    // {minLat: 10, maxLat:20 ...}
    //  [ {where.minLat: where.maxLat}  , {where.minLng: where.maxLng} ]

    // this is wrong
    // it will overwrite one or the other which is fine in our case
    if (minLat) where.lat = {[Op.gte]: Number(minLat)}
    if (maxLat) where.lat = {[Op.lte]: Number(maxLat)}
    if (minLng) where.lng = {[Op.gte]: Number(minLng)}
    if (maxLng) where.lng =  {[Op.lte]: Number(maxLng)}
    if (minPrice) where.price = {[Op.gt]: Number(minPrice)}
    if (maxPrice) where.price =  {[Op.lt]: Number(maxPrice)}

    page = typeof Number(page)!= "number" || Number(page)<=0 ||!(page)? 1: parseInt(page)
    size = typeof Number(size)!= "number" || Number(size)<=0 || !(size)? 20: parseInt(size)
    // at this point, we've changed it to a number, so you can more easily compare the number
    if (size > 20) {
      size = 20
    }
    pagination.offset= size * (page -1)
    pagination.limit= size

    // lat range only
    if ((minLat && maxLat) && !(minLng && maxLng) && !(minPrice && maxPrice)){
         spots = await Spot.findAll({
            where: {
                lat: {[Op.between] : [minLat, maxLat]},
            },
            ...pagination
        })
    }
    // lng range only
    else if ((!minLat && maxLat) && (minLng && maxLng) && !(minPrice && maxPrice)){
         spots = await Spot.findAll({
            where: {
                lng: {[Op.between] : [minLng, maxLng]}
            },
            ...pagination
        })
    }
    // price range only
    else if ((!minLat && maxLat) && !(minLng && maxLng) && (minPrice && maxPrice)){
         spots = await Spot.findAll({
            where: {
                price: {[Op.between]: [minPrice, maxPrice]}
            },
            ...pagination
        })
    }

    // lat range and lng range
    else if ((minLat && maxLat) && (minLng && maxLng) && !(minPrice && maxPrice)){
         spots = await Spot.findAll({
            where: {
                lat: {[Op.between] : [minLat, maxLat]},
                lng: {[Op.between] : [minLng, maxLng]}
            },
            ...pagination
        })
    }
    // if lat range and price range
    else if ((minLat && maxLat) && !(minLng && maxLng) && (minPrice && maxPrice)){
         spots = await Spot.findAll({
            where: {
                lat: {[Op.between] : [minLat, maxLat]},
                price: {[Op.between]: [minPrice, maxPrice]}
            },
            ...pagination
        })
    }
    // if lng and price range
    else if (!(minLat && maxLat) && (minLng && maxLng) && (minPrice && maxPrice)){
         spots = await Spot.findAll({
            where: {
                lng: {[Op.between] : [minLng, maxLng]},
                price: {[Op.between]: [minPrice, maxPrice]}
            },
            ...pagination
        })
    }

    // if all 3
    else if ((minLat && maxLat) && (minLng && maxLng) && (minPrice && maxPrice)){
         spots = await Spot.findAll({
            where: {
                lat: {[Op.between] : [minLat, maxLat]},
                lng: {[Op.between] : [minLng, maxLng]},
                price: {[Op.between]: [minPrice, maxPrice]}
            },
            ...pagination
        })
    }

    // if no pairs
    else {
         spots = await Spot.findAll({
            where,
            ...pagination,
            include: {model:Review}
        })

        // for (let i=0; i<spots.length; i++){
        //     let spotObj = spots[i]
        //     // get total number of reviews for each spot
        //     scores[i] = 0
        //     numReviews.push(spotObj.Reviews.length)
        //     for (let j =0; j< spots[i].Reviews.length; j++){
        //         let review =spots[i].Reviews[j]
        //         scores[i] = scores[i] + review.stars
        //     }
        // }
        // let newSpots = [...spots]
        // for (let i=0; i< newSpots.length; i++){
        //     // let spot = {...newSpots[i]}
        //     // spot.test = 1
        //     newSpots[i].avgStarRating = 2
        // }
    }

    res.json({
        spots
    })
});




module.exports = router;
