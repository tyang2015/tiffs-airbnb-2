const express = require('express');
const app = require('../app');

const { restoreUser, requireAuth, setTokenCookie } = require('../utils/auth.js');

const router = express.Router();

const {Spot, Review, Image, User, AppUser, sequelize} = require('../db/models')


router.post('/login', setTokenCookie, async (req, res, next)=>{
    const {email, password} = req.body
        // if email or password not provided
    if (!email || !password){
        res.statusCode=400
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "email": "Email is required",
              "password": "Password is required"
            }
        })
    }

    const foundUser = await AppUser.findOne({where: {email}})

    // invalid credentials
    if (!foundUser || (email!= foundUser.email) || password!=foundUser.password){
        res.statusCode = 401
        return res.json({
            "message": 'Invalid credentials',
            "statusCode": 401
        })
    }
    res.statusCode=200
    res.setHeader('Content-type', 'application/json')
    res.json({id: foundUser.id, firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email, token: ''})

})

module.exports = router
