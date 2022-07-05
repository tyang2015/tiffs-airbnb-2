const express = require('express');
const app = require('../app');

const { restoreUser, requireAuth } = require('../utils/auth.js');

const router = express.Router();

const {Spot, Review, Image, User, AppUser, sequelize} = require('../db/models')


 // added here
 router.post('/signup', async (req, res, next)=>{
    // i cannot create a username for this user
    //  so therefore it cant go into Users table
    const {firstName, lastName, email, password} = req.body
    // why doesnt 'where' clause in findOne work?
    let foundUser = await AppUser.findAll({where: {email}});

    // if already exists
    console.log('found user:', foundUser)
    if (foundUser.length>0){
      res.statusCode = 403
      return res.json({
        message: "User already exists",
        statusCode: 403,
        errors: {
          email:  "User with that email already exists"
        }
      });
    }
    // if incorrect inputs
    if (!firstName || !lastName || !email){
      res.statusCode = 400
      return res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "email": "Invalid email",
          "firstName": "First Name is required",
          "lastName": "Last Name is required"
      }});
    }
    // if not found, then we can input into AppUsers table
    await AppUser.create({firstName: firstName, lastName: lastName, email:email, password:password})
    let newRecord = await AppUser.findAll({where: {email}})
    // console.log('new record inserted:', newRecord[0])
    let newRecordObj= newRecord[0].toJSON()
    res.statusCode=200
    res.setHeader('Content-Type', 'application/json')
    res.json({id: newRecordObj.id, firstName, lastName, email, token: '' })

  });

  module.exports = router;
