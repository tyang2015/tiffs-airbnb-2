const express = require('express');
const app = require('../../app');
// added here
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

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


const router = express.Router();

const {Spot, Review, Image, User, sequelize} = require('../../db/models')

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
    console.log('req.body: ', req.body)
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
    else if (req.user.id!= spot.ownerId){
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    
    else if (!spot) {
        // doesnt belong to current user
        let error = new Error('Spot couldnt be found')
        error.status = 404
        res.json({"message": error.message, "statusCode": error.status})
    }

    // let validOwner = false
    // for (let i =0; i<spots.length; i++){
    //     let spot = spots[i]
    //     if (spot.ownerId = req.user.id) validOwner = true
    // }

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
        // attributes: {
        //     include: [
        //         [sequelize.literal(`(SELECT * FROM Reviews as review WHERE spot.id = review.spotId)`), 'avgRating']
        //     ]
        // },
        where: {id: req.params.spotId},
        include:
        [
            {model: Review, attributes:
                [
                    'id',
                    'spotId',
                    'review',
                    'stars',
                ]
            },
            {model: Image, attributes: ['url']},
            {model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']},
        ]
    });
    if (!spot){
        let error = new Error('sorry spot Id does not exist')
        res.statusCode=404
        next(error)
    }
    let newSpot = spot.toJSON()
    let countReviews = await Review.count({include: {model: Spot, where: {id: req.params.spotId}}})
    let totalScore = await Review.sum('stars', {include: {model: Spot, where: {id: req.params.spotId}}})

    // let totalScore = await Review.findAll({
    //     attributes:{
    //         include: [[sequelize.fn('SUM', sequelize.col('stars')), 'sumRatings']]
    //     },
    //     include: [
    //         {model:Spot, where: {id: req.params.spotId}},
    //     ],
    // })

    newSpot.numReviews= countReviews
    newSpot.avgStarRating = (totalScore/countReviews).toFixed(2)

    res.json(newSpot)
});

router.get('/', async(req, res, next)=>{
    let spots = await Spot.findAll();
    res.json(spots)
});


module.exports = router;
