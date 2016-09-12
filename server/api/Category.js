var Category = require('../models/category');

function getCategories(req, res) {
  Category.find({}, function (err, categories) {
    if (err) return res.send(err);
    res.json(categories);
  });
}

//Kategorileri getir
project.app.get('/category', function (req, res) {
  getCategories(req, res);
});

//Kategori oluştur
project.app.post('/category', project.util.isAdmin, function (req, res) {
  var category = new Category({name: req.body.name});
  category.save(function (err) {
    if (err) return res.send(err);
    getCategories(req, res);
  });
});

//Kategori sil
project.app.delete('/category/:id', project.util.isAdmin, function (req, res) {
  Category.findByIdAndRemove(req.params.id, function (err) {
    if (err) res.send(err);
    getCategories(req, res);
  });
});

//Kategori düzenle
project.app.put('/category', function (req, res) {
  Category.findById(req.body._id, function (err, category) {
    if (err) res.send(err);
    category.name = req.body.name;
    category.save(function (err) {
      if (err) res.send(err);
      getCategories(req, res)
    });
  });
});