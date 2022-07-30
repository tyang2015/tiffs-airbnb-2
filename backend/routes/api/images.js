const express = require('express')

const {requireAuth, restoreUser } = require('../../utils/auth');
// phase 5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Review, Spot , Image} = require('../../db/models');

const router = express.Router();

// imageable id is image id and imageable type can be review id OR spot id
// since its not specifying review or spot, that should not matter, but image id is unique to only 1 image
router.delete('/:imageId', requireAuth, async(req, res, next)=>{
    let image = await Image.findOne({
        // include: [{model: Review, attributes: []}, {model: Spot, attributes:[]}],
        where: {id: req.params.imageId },
     })
    if (!image){
        res.statusCode = 404
        res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
        })
    }
    await image.destroy()
    res.statusCode = 200
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})

// // ADDED: get images for spot id (to be put on create/edit bookings tab)
// router.get('')



module.exports = router
