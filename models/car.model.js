const mongoose = require('mongoose');

const TYPE = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];

const CarSchema = new mongoose.Schema({
  user:{
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
      }
    ]  
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
  },
  carNumber: {
    type: String,
    required: true,
    unique: true
  },
  engine: {
    type: String,
    enum: TYPE
  },
  km:{ //iniciales y los que vaya actualizando el usuario
    type:Number,
    required: true
  },
  year:{ //importante para cuando se tiene que pasar la itv
    type:Number,
    required: true
  },
  imageURl: {
    type: String,
  },
  event:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'MainteSchema',
  }
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

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;