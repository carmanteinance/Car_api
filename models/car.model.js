const mongoose = require('mongoose');

const constants = require ('./BBDD_Cars');
const MaintenanceSchema = require('./maintenance.schema');

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  brand: {
    type: String,
    enum: Object.keys(constants.carsModels),
    required: true
  },
  model: {
    type: String,
    validate: {
      validator: function(model) {
        return constants.carsModels[this.brand].includes(model);
      }
    }
  },
  carNumber: {
    type: String,
    required: true,
    unique: true
  },
  engine: {
    type: String,
    enum: constants.engineType
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
  maintenance: {
    type: MaintenanceSchema,
    default: {}
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

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;