// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // const errors = validationErrors
    //   .array()
    //   .map((error) => `${error.msg}`);

    // added here
    let errors={}
    validationErrors.array().forEach((err)=>{
      errors[err.param] = err.msg
    })
    // console.log("new error obj:", errors )

    let err = new Error
    // must differentiate between normal validation errors vs errors with EXISTING endate and startDate
    err.message = "Validation Error"
    err.errors = errors
    err.statusCode = 400
    err.status = 400
    next(err)

    // const err = Error('Bad request.');
    // err.errors = errors;
    // err.status = 400;
    // err.title = 'Bad request.';
    // next(err);
  }
  next();
};

const handleDateConflictErrors =(req,_res,next)=>{
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    // added here
    let errors={}
    validationErrors.array().forEach((err)=>{
      if (err.param=== 'startDate') errors[err.param] =  "Start date conflicts with an existing booking"
      if (err.param === 'endDate') errors[err.param] = "End date conflicts with an existing booking"
      // errors[err.param] = err.msg
    })

    let err = new Error
    err.message = "Sorry, this spot is already booked for the specified dates"
    err.errors = errors
    err.statusCode = 403
    err.status= 403
    next(err)
  }
  next();

}

module.exports = {
  handleValidationErrors,
  handleDateConflictErrors
};
