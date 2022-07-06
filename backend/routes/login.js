const express = require('express');
const app = require('../app');

const { restoreUser, requireAuth, setTokenCookie } = require('../utils/auth.js');

const router = express.Router();

const {Spot, Review, Image, User, AppUser, sequelize} = require('../db/models')


router.post('/login', setTokenCookie, async (req, res, next)=>{

})

module.exports = router
