var express = require('express');
var router = express.Router();
const travelCtrl = require('../controllers/travel');
router.get('/', travelCtrl.travel);

module.exports = router;
