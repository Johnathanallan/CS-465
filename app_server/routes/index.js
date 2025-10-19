var express = require('express');
var router = express.Router();
const mainCtrl = require('../controllers/main');

router.get('/', mainCtrl.index);
module.exports = router;
