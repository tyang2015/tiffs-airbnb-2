const router = require('express').Router()
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const { restoreUser, requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);
// for login
router.use('/session', sessionRouter);

// for signup and getting current users
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter)

// app.use('/users', require('./routes/user'))


// // for testing user auth middleware
// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// // ...

// router.get(
//     '/restore-user',
//     restoreUser,
//     (req, res) => {
//       return res.json(req.user);
//     }
//   );

//   router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//       return res.json(req.user);
//     }
//   );


router.post('/test', (req,res)=>{
    res.json({requestBody: req.body});
});


module.exports = router;
