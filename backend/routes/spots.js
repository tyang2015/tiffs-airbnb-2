const express = require('express');
const app = require('../app');
// added here
const { restoreUser } = require('../utils/auth.js');
const { requireAuth } = require('../utils/auth.js');


const router = express.Router();

const {Spot, Review, Image, User, sequelize} = require('../db/models')

// HAVE NOT TESTED THIS POST ROUTE. TEST AFTER FINISHED WITH OTHER ROUTES
router.post('/', requireAuth, async (req,res, next)=>{

    const {address, city, state, country, lat, lng, name, description, price}= req.body
    await Spot.create({ownerId: req.user, address, city, state, country, lat, lng, name, description, price})
    res.statusCode=201
    let newRecord = await Spot.findOne({attributes: {exclude: ['previewImage']}, where: {address, city, state, country, lat, lng, name, description, price}})
    res.json(newRecord)
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
                    // [sequelize.fn('COUNT', sequelize.col('Reviews.id')), "numReviews"],
                    // [sequelize.fn('SUM', sequelize.col('Reviews.stars')), "totalScore"],
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
