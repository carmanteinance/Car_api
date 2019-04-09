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
    type: Date,
    required: true
  },
  imageURl: {
    type: String,
  },
  maintenance: {
    type: MaintenanceSchema,
    default: {}
  },
  lastITV: {
    type: Date
  }
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });


  CarSchema.virtual('nextITV')
    .get(function (){
      const yearToday = new Date().getFullYear();

      if (yearToday - this.year <= 4){
        return this.lastItvtoDateString() = 4+this.lastITV.getFullYear();
      } else if (yearToday - this.year >= 10){
        return this.lastItv = 1+this.lastITV.getFullYear();
      } else return this.lastItv = doc.lastITV.setYear(2);
    })

CarSchema.pre('save', function(next) {
  if (this.isNew) {
    this.lastITV = this.year;   
  } else {
    this.lastITV = this.lastITV;
  }

  next();
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;