var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remarks = require('../models/remarks');

/* GET users listing. */
router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
});

router.post('/:id', function (req, res, next) {
  var id = req.params.id;
});

router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
});

module.exports = router;
