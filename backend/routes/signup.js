const express = require('express');
const app = require('../app');

const { restoreUser, requireAuth } = require('../utils/auth.js');

const router = express.Router();

const {Spot, Review, Image, User, AppUser, sequelize} = require('../db/models')

 // added here
 router.post('/signup', async (req, res, next)=>{
    // i cannot create a username for this user

});

  module.exports = router;
