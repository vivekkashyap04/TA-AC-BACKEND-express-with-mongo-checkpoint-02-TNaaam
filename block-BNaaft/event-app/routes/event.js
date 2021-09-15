var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remarks = require('../models/remarks');
var qs = require('querystring');

/* GET users listing. */
router.get('/new', (req, res, next) => {
  res.render('eventForm');
});
router.get('/', function (req, res, next) {
  let query = {};
  if (req.query.location) {
    query.location = req.query.location;
  } else if (req.query.category) {
    query.event_category = req.query.category;
  }
  Event.find(query, (err, eventList) => {
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
    res.render('updateevent', { event: data });
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
//likes
router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;

  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, info) => {
    if (err) return next(err);
    res.redirect('/event/' + id);
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
