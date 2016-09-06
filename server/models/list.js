var mongoose = require("mongoose");

var listSchema = mongoose.Schema({
    title: String, //Listenin başlığı
    items: [{      //Listenin elemanları
      name: String,   //Elemanın adı
      description: String, //Eleman açıklaması
      isApproved: Boolean,  //Eleman onay durumu
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
    isApproved: Boolean
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('List', listSchema);
