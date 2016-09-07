var List = require('../models/list');

function getUsersLists(req, res) {
  List.find({createdBy: req.user.id}, null, {createdAt: -1}, function (err, lists) {
    if (err) res.send(err);
    res.json(lists);
  });
}

function getAllLists(req, res) {
  List.find({}, function (err, lists) {
    if (err) return res.send(err);
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
  List.findByIdAndRemove(req.params.id, function (err) {
    if (err) res.send(err);
    getUsersLists(req, res);
  });
});

//Get users lists
project.app.get('/list', project.util.isLoggedIn, function (req, res) {
  getUsersLists(req, res);
});

//Get all lists for Admin
project.app.get('/list/all', project.util.isAdmin, function (req, res) {
  getAllLists(req, res);
});

//Approve a list
project.app.get('/list/:id', project.util.isAdmin, function (req, res) {
  List.findById(req.params.id, function (err, list) {
    if (err) res.send(err);
    list.isApproved = true;
    list.save(function (err) {
      if (err) res.send(err);
      getAllLists(req, res);
    });
  });
});

//Approve an item
project.app.get('/list/item/:list_id/:item_id', project.util.isAdmin, function (req, res) {
  List.findById(req.params.list_id, function (err, list) {
    if (err) res.send(err);

    var isExist = list.items.some(function (item) {
      if (item._id == req.params.item_id) {
        item.isApproved = true;
        return true;
      }
    });

    if (isExist) {
      list.save(function (err) {
        if (err) res.send(err);
        getAllLists(req, res);
      });
    } else {
      getAllLists(req, res);
    }
  });
});

//Like or dislike a list
project.app.get('/api/list/like/:list_id/:item_id', project.util.isLoggedIn, function (req, res) {

  List.findById(req.params.list_id, function (err, list) {
    if (err) return res.send(err);

    var itemIndex = 0;
    list.items.some(function (item, index) {
      if (item._id == req.params.item_id) {
        itemIndex = index;
        return true;
      }
    });

    //Kullanıcı önceden beğenmiş mi diye kontrol ediliyor.
    var isExist = list.items[itemIndex].likes.some(function (userId) {
      return userId == req.user.id;
    });

    //Kullanıcı daha önceden beğenmemişse
    if (!isExist) {
      list.items[itemIndex].likes.push(req.user.id);
    } else {
      list.items[itemIndex].likes.splice(list.items[itemIndex].likes.indexOf(req.user.id), 1);
    }

    list.save(function (err) {
      if (err) return res.send(err);
      getUsersLists(req, res);
    });
  });
});