var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.DB_HOST || process.env.MONGOLAB_URI);
var listCollection = db.get('list');
var validations = require('../src/validations.js');
var title = "Crud Practice";

router.get('/list', function (req, res, next) {
  listCollection.find({}, function (err, data) {
    res.render('list/index', {title : title, data : data});
  });
});

router.get('/list/new', function (req, res, next) {
  res.render('list/new', {title : title});
});

router.post('/list', function (req, res, next) {
  var validate = validations.validations(req.body.first_name, req.body.last_name, req.body.email);

  if(validate) {
    var data = {firstName : req.body.first_name, lastName : req.body.last_name, email : req.body.email};
    res.render('list/new', {title : title, data : data, errorMessages : validate});
  } else {
    listCollection.insert(
      {
        firstName : req.body.first_name,
        lastName : req.body.last_name,
        email : req.body.email
      });
    res.redirect('/list');
  }
});

router.get('/list/:id', function (req, res, next) {
  listCollection.findOne({_id : req.params.id}, function (err, data) {
    res.render('list/show', {title : title, data : data});
  });
});

router.get('/list/:id/edit', function (req, res, next) {
  listCollection.findOne({ _id : req.params.id}, function (err, data) {
      res.render('list/edit', {title : title, data : data});
  });
});

router.post('/list/:id', function (req, res, next) {
  var validate = validations.validations(req.body.first_name, req.body.last_name, req.body.email);

  if(validate) {
    var data = {firstName : req.body.first_name, lastName : req.body.last_name, email : req.body.email, _id : req.params.id};
    res.render('list/edit', {title : title, data : data, errorMessages : validate});
  } else {
    listCollection.update(
      {
        _id : req.params.id
      },
        {
          $set :
            {
              firstName : req.body.first_name,
              lastName : req.body.last_name,
              email : req.body.email
            }
        });
    res.redirect('/list/' + req.params.id);
  }
});

router.post('/list/:id/delete', function (req, res, next) {
  listCollection.remove({ _id : req.params.id});
  res.redirect('/list');
});



module.exports = router;
