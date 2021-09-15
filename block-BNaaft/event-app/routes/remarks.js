var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remarks = require('../models/remarks');

/* GET users listing. */
router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Remarks.findById(id, (err, remarks) => {
    res.render('updateremark', { remark: remarks });
  });
});

router.post('/:id', function (req, res, next) {
  var id = req.params.id;
  Remarks.findByIdAndUpdate(id, req.body, (err, info) => {
    if (err) return next(err);
    res.redirect('/event/' + info.eventId);
  });
});

router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Remarks.findByIdAndDelete(id, (err, info) => {
    Event.findByIdAndUpdate(
      info.eventId,
      { $pull: { remarks: info._id } },
      (err, info) => {
        console.log(info);
        if (err) return next(err);
        res.redirect('/event/' + info.eventId);
      }
    );
  });
});

//likes
router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;

  Remarks.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, info) => {
    if (err) return next(err);
    res.redirect('/event/' + info.eventId);
  });
});

module.exports = router;
