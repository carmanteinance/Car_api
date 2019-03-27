const mongoose = require('mongoose');

const EVENT = ["oil", "filterOil", "breaksKit", "ac", "tires", "airFilter", "battery", "suspension", "chain", "coolant"];

const MaintenanceEventSchema = new mongoose.Schema({
  kmLastChanged: {
    type: Number,
    min: 0
  },
  lastChangeDate: Date
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

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

module.exports = Maintenance;

