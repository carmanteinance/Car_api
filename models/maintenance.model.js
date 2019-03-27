const mongoose = require('mongoose');

const EVENT = ["oil", "filterOil", "breaksKit", "ac", "tires", "airFilter", "battery", "suspension", "chain", "coolant"];
const REVIEW = ["suspension","chain","general"]

const MaintenSchema = new mongoose.Schema({

  kmNow:{
    type: Number,
    default: 0
  },

  kmLastChange: {
    type: Number,
    enum: EVENT,
  },

  timeLastChange:{
    type: Date,
    enum: EVENT,
  },

  kmNeedsReview:{
    type:Number,
    enum: REVIEW,

  }

})

const Maintenance = mongoose.model('Maintenance', MaintenSchema);

module.exports = Maintenance;

const mongoose = require('mongoose');

const EVENT = ["oil", "filterOil", "breaksKit", "ac", "tires", "airFilter", "battery", "suspension", "chain", "coolant"];

const MaintenanceEventSchema = new mongoose.Schema({
  kmLastChanged: {
    type: Number,
    min: 0
  },
  dateLastChange: Date,

  
  kmNextChange: {
    type: Number,
    min: 0
  },
  dateNextChange: Date,

  closeToKmChange:  {
    type: Number,
    min: 0
  },
  closeToDateChange: Date,


  kmNextReview:  {
    type: Number,
    min: 0
  },
  dateNextReview: Date,

  closeToKmReview:  {
    type: Number,
    min: 0
  },
  closeToDateReview: Date

})

const maintentanceEventFields = EVENT.reduce((acc, event) => {
  return { ...acc, [event]: MaintenanceEventSchema }
}, {})

const MaintenanceSchema = new mongoose.Schema({
  ...maintentanceEventFields,
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }
})

MaintenanceEventSchema.virtual('car', {
  ref:'Car',
  localField:'_id',
  foreignField: 'Manteinance',
  options: {sort: {brand: -1}}
})

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

module.exports = Maintenance;
