var List = require('../models/list');

function getUsersLists(req, res) {
  List.find({createdBy: req.user.id}, null, {createdAt: -1}, function (err, lists) {
    if (err) res.send(err);
    res.json(lists);
  });
}

//Create list
project.app.post('/list', project.util.isLoggedIn, function (req, res) {

  var list = new List({
    title: req.body.title,
    createdBy: req.user.id,
    isApproved: req.user.isAdmin == true
  });

  list.save(function (err) {
    if (err) res.send(err);
    getUsersLists(req, res);
  });
});

//Update list
project.app.put('/list', project.util.isLoggedIn, function (req, res) {
  List.findById(req.body._id, function (err, list) {
    if (err) res.send(err);
    list.title = req.body.title;
    list.save(function (err) {
      if (err) res.send(err);
      getUsersLists(req, res);
    });
  });
});

//Delete list
project.app.delete('/list/:id', project.util.isLoggedIn, function (req, res) {
  List.findById(req.params.id, function (err, list) {
    if (err) res.send(err);
    list.remove(function (err, removed) {
      if (err) res.send(err); //TODO removed değişkenini kullan
      getUsersLists(req, res);
    });
  });
});

//Get users lists
project.app.get('/list', project.util.isLoggedIn, function (req, res) {
  // getUsersLists(req, res);
  List.find({}, function (err, lists) {
    if (err) return res.send(err);
    res.json(lists);
  });
});

//Get all lists for Admin
project.app.get('/list/all', project.util.isAdmin, function (req, res) {
  List.find({}, function (err, lists) {
    if (err) return res.send(err);
    res.json(lists);
  });
});