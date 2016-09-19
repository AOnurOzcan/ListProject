var mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
  name: String //Kategori adı
});

module.exports = mongoose.model('Category', categorySchema);
