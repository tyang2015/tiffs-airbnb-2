const express = require('express');
const app = require('../app');

const { restoreUser, requireAuth } = require('../utils/auth.js');

const router = express.Router();

const {Spot, Review, Image, User, AppUser, sequelize} = require('../db/models')





module.exports = router
