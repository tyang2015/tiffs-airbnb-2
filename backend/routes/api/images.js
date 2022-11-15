const express = require('express')

const {requireAuth, restoreUser } = require('../../utils/auth');
// phase 5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Review, Spot , Image} = require('../../db/models');
const booking = require('../../db/models/booking');

const router = express.Router();

// CHANGE URL ENDPOINT FOR UPDATE IMAGE
router.patch('/:imageId', requireAuth, async (req, res, next) => {
  console.log("HITTING RIGHT ROUTE IN UPDATE IMG\n\n")
  let image = await Image.findOne({
    where : {id: req.params.imageId},
    include: {model:Spot}
  })
  if (!image){
    res.statusCode = 404
    res.json({
        "message": "Image couldn't be found",
        "statusCode": 404
    })
  }
  if (image.Spot.ownerId != req.user.id){
    res.statusCode = 403;
    res.json({
        "message": "Forbidden",
        "statusCode": 403
    })
  }
  const { url } = req.body
  image.url = url
  await image.save()
  console.log("image from backend:", image.toJSON())
  res.json(image)

})


// imageable id is image id and imageable type can be review id OR spot id
// since its not specifying review or spot, that should not matter, but image id is unique to only 1 image
router.delete('/:imageId', requireAuth, async(req, res, next)=>{
    let image = await Image.findOne({
        // include: [{model: Review, attributes: []}, {model: Spot, attributes:[]}],
        include: [{model: Spot}],
        where: {id: req.params.imageId },
     })
    if (!image){
        res.statusCode = 404
        res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
        })
    }
    if (image.Spot.ownerId != req.user.id){
      res.statusCode = 403;
      res.json({
          "message": "Forbidden",
          "statusCode": 403
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
