const mongoose = require('mongoose');

const TYPE = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];

const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  position: {
    type: Number,
    required: true,
    unique: true
  },
  imageURl: {
    type: String,
  },
  label: {
    type: String,
    enum: TYPE
  },

}, {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });

schema.virtual('user', {
    ref:'User',
    localfield:'_id',
    foreingField: 'car',
    options: {sort: {brand: -1}}

})

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;