var mongoose = require("mongoose");

var listSchema = mongoose.Schema({
    title: String, //Listenin başlığı
    items: [{      //Listenin elemanları
      name: String,   //Elemanın adı
      description: String, //Eleman açıklaması
      link: String, //Elemanın linki
      isApproved: {type: Boolean, default: false},  //Eleman onay durumu
      likes: [    //Beğenenler
        {
          type: mongoose.Schema.Types.String,
          ref: 'User'
        }
      ],
      createdBy: {  //Elemanın kim tarafından oluşturulduğu
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
    createdBy: {  //Listenin kim tarafından oluşturulduğu
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    isApproved: {type: Boolean, default: false}
  },
  {
    timestamps: true
  });

// listSchema.pre('save', function(next) {
//   next();
// });

module.exports = mongoose.model('List', listSchema);
