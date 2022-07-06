const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// all your next(errors) funneled here
const routes = require('./routes')
const { ValidationError } = require('sequelize');
const { restoreUser, requireAuth, setTokenCookie} = require('./utils/auth');
const { handleValidationErrors } = require('./utils/validation');
// const signup = require('./routes/signup');
// const login = require('./routes/login');

const { environment } = require('./config');
const user = require('./db/models/user');
const {AppUser} = require('./db/models')
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());



if (!isProduction){
    app.use(cors());
}

app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

app.use(
    csurf({
        cookie: {
            secure:isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
    );

app.use(routes);

// added: phase 2
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });


// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// // error from express-validator function
// // for POST /api/spots and PATCH /api/spots/:spotId
// app.use((err, req, res, next)=>{
//   res.statusCode = 400
//   res.json({
//     errors: err.errors
//     // "address": "Street address is required",
//     // "city": "City is required",
//     // "state": "State is required",
//     // "country": "Country is required",
//     // "lat": "Latitude is not valid",
//     // "lng": "Longitude is not valid",
//     // "name": "Name must be less than 50 characters",
//     // "description": "Description is required",
//     // "price": "Price per day is required"
//   })
// })

// // error from express-validator function
// // ask how to tailor error for express-validators?
// // for LOGIN
// app.use((err, req, res, next)=>{
//   res.statusCode=400;
//   res.json({
//     "message": "Validation error",
//     "statusCode": 400,
//     "errors": {
//       "email": "Email is required",
//       "password": "Password is required"
//     }
//   });
// });



// // error for actual validation from express-validator function
// // how do i specify that express-validator errors should go in here?
// // for SIGNUP
// app.use((err, req,res, next)=>{
//   // if (err instanceof handleValidationErrors){
//     // let errObj = {}
//     res.statusCode = 400
//     res.json({
//       "message": "Validation error",
//       "statusCode": 400,
//       "errors": {
//         // ...errObj
//         "email": "Invalid email",
//         "firstName": "First Name is required",
//         "lastName": "Last Name is required"
//       }
//     })
//   // }
// })

// // added here for sign up error when user already exists
// app.use( (err, req, res, next) =>{

// })

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      // title: err.title || 'Server Error',
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });



module.exports = app;
