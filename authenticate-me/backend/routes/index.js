const express= require('express');
const router = express.Router();
// added /index
const apiRouter = require('./api/index')

router.use('/api', apiRouter)

router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });


router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    // req.json(req)
    res.send('Hello Tiffany');
});

module.exports = router;
