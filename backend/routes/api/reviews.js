const express = require('express')

const {requireAuth, restoreUser } = require('../../utils/auth');
// phase 5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Review, Spot , Image} = require('../../db/models');


const router = express.Router();

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
    // .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// TO DO: add more than 10 images for 1 review to test the error
router.post('/:reviewId/images', requireAuth, async(req,res,next)=>{
    let {url} = req.body
    const review = await Review.findOne({
        include:[{model: Image}, {model: User}],
        where: {id: req.params.reviewId}
    })
    if (!review){
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (review.userId != req.user.id){
        res.statusCode = 403;
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    // let countImages = await Review.count('Image.id',{include: {model: Image, attributes: []}, where:{id: req.params.reviewId} })
    let countImages = await Image.count({where:{reviewId: req.params.reviewId}})
    if (countImages>=10){
        res.statusCode = 400
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 400
        })
    }
    else {
        // no images or less than 10
        res.statusCode= 200
        // res.json(countImages)
        let newImage = await Image.create({
            spotId: review.spotId,
            reviewId: req.params.reviewId,
            url
        })
        res.json(newImage)
    }
})


router.delete('/:reviewId', requireAuth, async (req,res,next)=>{
    const review = await Review.findOne({where: {id: req.params.reviewId}})
    // if review userId is not the same as current user id
    if (!review){
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if (review.userId != req.user.id){
        res.statusCode = 403
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    await review.destroy()
    res.statusCode = 200
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})

router.patch('/:reviewId', requireAuth, validateReview, async (req, res, next)=>{
    const {review, stars} = req.body
    let record = await Review.findOne({where: {id: req.params.reviewId}})
    if (!record){
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    record.review = review
    record.stars = stars
    await record.save()
    res.json(record)

})



module.exports = router
