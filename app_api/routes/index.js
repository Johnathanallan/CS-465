// app_api/routes/index.js
const express  = require('express');
const router   = express.Router();
const tripCtrl = require('../controllers/trips');

router.route('/trips')
  .get(tripCtrl.tripsList)
  .post(tripCtrl.tripsAdd);

router.route('/trips/:tripCode')
  .get(tripCtrl.tripsFindByCode)
  .put(tripCtrl.tripsUpdateTrip)
  .delete(tripCtrl.tripsDelete); 

module.exports = router;
