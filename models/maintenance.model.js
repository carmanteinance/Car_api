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

