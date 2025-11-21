// app_api/routes/index.js
const express  = require('express');
const router   = express.Router();
const authController = require('../controllers/authentication');
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens
const tripCtrl = require('../controllers/trips');

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router.route('/trips')
  .get(tripCtrl.tripsList)
  .post(authenticateJWT, tripCtrl.tripsAdd);
  

router.route('/trips/:tripCode')
  .get(tripCtrl.tripsFindByCode)
  .put(authenticateJWT, tripCtrl.tripsUpdateTrip)
  .delete(authenticateJWT, tripCtrl.tripsDelete); 

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  // console.log('In Middleware');
  const authHeader = req.headers['authorization'];
  // console.log('Auth Header: ' + authHeader);
  if (authHeader == null) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }

  const headers = authHeader.split(' ');
  if (headers.length < 2) {
    console.log('Not enough tokens in Auth Header: ' + headers.length);
    return res.sendStatus(401);
  }

  const token = headers[1];
  // console.log('Token: ' + token);
  if (!token) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = decoded; // Put decoded token on the request
    next();
  } catch (err) {
    console.log('Token Validation Error!', err?.message);
    return res.status(401).json('Token Validation Error!');
  }
}

module.exports = router;
