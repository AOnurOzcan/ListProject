var List = require('../models/listModel');

//--------- HELPER FUNCTIONS ----------//
function getUsersLists(req, res) {
  List.find({createdBy: req.user.id}, null, {createdAt: -1}, function (err, lists) {
    if (err) return res.send(err);
    res.json(lists);
  });
}

function getAllLists(req, res) {
  List.find({}, function (err, lists) {
    if (err) return res.send(err);
    res.json(lists);
  });
}

function getRecentLists(req, res) {
  List.find({isApproved: true})
    .populate('createdBy', 'facebook.name facebook.profilePicture')
    .populate('likes')
    .populate('items.createdBy')
    .sort({createdAt: -1})
    .limit(4).exec(function (err, lists) {
    if (err) return res.send(err);
    res.json(lists);
  });
}

function getUnapprovedLists(req, res) {
  List.find({isApproved: false}).populate("category").exec(function (err, lists) {
    if (err) return res.send(err);
    res.json(lists);
  });
}

function getUnapprovedItems(req, res) {
  List.find({}).populate("category").exec(function (err, lists) {
    if (err) return res.send(err);
    var unapprovedItems = [];

    lists.forEach(function (list) {
      list.items.forEach(function (item) {
        if (item.isApproved == false) {
          unapprovedItems.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            link: item.link,
            listName: list.title,
            category: list.category,
            listId: list._id
          });
        }
      });
    });
    res.json(unapprovedItems);
  });
}

function getListsByCategory(req, res, searchCriteria) {
  searchCriteria.isApproved = true;
  List.find(searchCriteria)
    .populate('createdBy', 'facebook.name facebook.profilePicture')
    .populate('likes')
    .populate('items.createdBy')
    .sort({createdAt: -1})
    .exec(function (err, lists) {
      if (err) res.send(err);

      res.json(lists);
    });
}
//--------- HELPER FUNCTIONS ----------//

//Recent lists
project.app.get('/list/recent', function (req, res) {
  getRecentLists(req, res);
});

//Create list
project.app.post('/list', project.util.isLoggedIn, function (req, res) {

  var list = new List({
    title: req.body.title,
    createdBy: req.user.id,
    category: req.body.category,
    isApproved: req.user.isAdmin == true
  });

  list.save(function (err) {
    if (err) return res.send(err);
    getUsersLists(req, res);
  });
});

//Update list
project.app.put('/list', project.util.isLoggedIn, function (req, res) {
  List.findById(req.body._id, function (err, list) {
    if (err) res.send(err);
    list.title = req.body.title;
    list.category = req.body.categoryId;
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

//Delete list and get unapproved lists
project.app.delete('/list/unapproved/:id', project.util.isLoggedIn, function (req, res) {
  List.findByIdAndRemove(req.params.id, function (err) {
    if (err) res.send(err);
    getUnapprovedLists(req, res);
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
project.app.get('/list/approve/:id', project.util.isAdmin, function (req, res) {
  List.findById(req.params.id, function (err, list) {
    if (err) res.send(err);
    list.isApproved = true;
    list.save(function (err) {
      if (err) res.send(err);
      getUnapprovedLists(req, res);
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
        getUnapprovedItems(req, res);
      });
    } else {
      getUnapprovedItems(req, res);
    }
  });
});

//Like or dislike a list
project.app.get('/list/like/:list_id/:item_id', project.util.isLoggedIn, function (req, res) {

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
      getRecentLists(req, res);
    });
  });
});

//Create Item
project.app.post('/list/item/', project.util.isLoggedIn, function (req, res) {
  List.findById(req.body.list_id, function (err, list) {
    list.items.push({
      name: req.body.name,
      link: req.body.link,
      description: req.body.description,
      createdBy: req.user.id,
      isApproved: req.user.isAdmin == true
    });
    list.save(function (err) {
      if (err) return res.send(err);

      getUsersLists(req, res);
    });
  });
});

//Remove item
project.app.delete('/item/:list_id/:item_id', project.util.isLoggedIn, function (req, res) {
  List.findById(req.params.list_id, function (err, list) {
    if (err) return res.send(err);

    var itemIndex = 0;
    var isExist = list.items.some(function (item, index) {
      if (item._id == req.params.item_id) {
        itemIndex = index;
        return true;
      }
    });

    if (isExist == true) {
      list.items.splice(itemIndex, 1);
    }

    list.save(function (err) {
      if (err) return res.send(err);
      getUnapprovedItems(req, res);
    });
  });
});

//Get unapproved lists
project.app.get('/list/unapproved', project.util.isAdmin, function (req, res) {
  getUnapprovedLists(req, res);
});

//Get uapproved items
project.app.get('/item/unapproved', project.util.isAdmin, function (req, res) {
  getUnapprovedItems(req, res);
});

//Get lists by category id
project.app.get('/list/category/:categoryId', function (req, res) {

  var searchCriteria = {};

  if (req.params.categoryId != null && req.params.categoryId != "undefined") {
    if (req.params.categoryId != "recent") {
      searchCriteria.category = req.params.categoryId;
      getListsByCategory(req, res, searchCriteria);
    } else {
      getRecentLists(req, res);
    }
  }

});