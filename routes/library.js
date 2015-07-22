var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/library2');
var libraryCollection = db.get('library');

router.get('/library', function (req, res, next) {
  libraryCollection.find({}, function (err, record) {
    res.render('library/index', { record : record});
  });
});

router.post('/library', function (req, res, next) {
  libraryCollection.insert(
    {
      title : req.body.title,
      author : req.body.author
    });
    res.redirect('/library');
});

router.get('/library/new', function (req, res, next) {
  res.render('library/new');
});

router.get('/library/:id', function (req, res, next) {
  libraryCollection.findOne({_id : req.params.id}, function (err, record) {
    res.render('library/show', {record : record});
  });
});

router.get('/library/:id/edit', function (req, res, next) {
  libraryCollection.findOne({_id : req.params.id}, function (err, record) {
    res.render('library/edit', {record : record});
  });
});

router.post('/library/:id', function (req, res, next) {
  libraryCollection.update(
    {
      _id : req.params.id
    },
    {
      $set :
      {
          title : req.body.title,
          author : req.body.author
      }
    });
  res.redirect('/library/' + req.params.id);
});

router.post('/library/:id/delete', function (req, res, next) {
  libraryCollection.remove({_id : req.params.id});
  res.redirect('/library');
});

module.exports = router;
