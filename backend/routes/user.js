const express = require('express');
const app = require('../app');

const { restoreUser, requireAuth } = require('../utils/auth.js');

const router = express.Router();

const {Spot, Review, Image, User, AppUser, sequelize} = require('../db/models')


router.get('/currentUser', requireAuth, async (req,res, next)=>{
    // requireAuth is a 2 part array of middlewares for authentication
    console.log("Req.user: ", req.user)
    let currentUser= await AppUser.findAll({where: {id: req.user}})
    res.json({currentUser})

});


module.exports = router
