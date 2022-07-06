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
    // console.log("In validation errors: ", validationErrors.array())
    // let errors = validationErrors.array().reduce((ele, accum)=>{
    //   return
    // } , {})
    let errors={}
    validationErrors.array().forEach((err)=>{
      errors[err.param] = err.msg
    })
    // console.log("new error obj:", errors )

    let err = new Error
    err.message = "Validation Error"
    err.errors = errors
    err.statusCode = 400
    next(err)

    // const err = Error('Bad request.');
    // err.errors = errors;
    // err.status = 400;
    // err.title = 'Bad request.';
    // next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
