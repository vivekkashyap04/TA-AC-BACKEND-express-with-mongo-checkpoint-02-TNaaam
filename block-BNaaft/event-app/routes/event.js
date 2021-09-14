var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remarks = require('../models/remarks');

/* GET users listing. */
router.get('/new', (req, res, next) => {
  res.render('eventForm');
});
router.get('/', function (req, res, next) {
  Event.find({}, (err, eventList) => {
    if (err) return next(err);
    res.render('listOfevent', { events: eventList });
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Event.findById(id)
    .populate('remarks')
    .exec((err, data) => {
      if (err) return next(err);
      console.log(data);
      res.render('eventDetail', { event: data });
    });
});

router.post('/', (req, res, next) => {
  Event.create(req.body, (err, data) => {
    if (err) return next(err);
    res.redirect('/event');
  });
});
//edit
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Event.findById(id, (err, data) => {
    if (err) return next(err);
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, req.body, (err, data) => {
    if (err) return next(err);
    res.redirect('/event/' + data._id);
  });
});
//delete
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err);
    Remarks.deleteMany({ eventId: id }, (err, data) => {
      res.redirect('/event');
    });
  });
});

//remarks
router.post('/:id/remarks', (req, res, next) => {
  var id = req.params.id;
  req.body.eventId = id;
  Remarks.create(req.body, (err, remarks) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(
      id,
      { $push: { remarks: remarks._id } },
      (err, data) => {
        if (err) return next(err);
        res.redirect('/event/' + id);
      }
    );
  });
});

module.exports = router;
