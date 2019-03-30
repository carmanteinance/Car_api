const mongoose = require('mongoose');

const EVENTS = ["ITV", "oil", "filterOil", "breaksKit", "ac", "tires", "airFilter", "battery", "suspension", "chain", "coolant", "plugs", "heaters", "batteryCoolant"];

const MaintenanceEventSchema = new mongoose.Schema({
  
  eventType: { type: String, enum: EVENTS, },

  kmLastChanged: { type: Number, default: 0 },
  dateLastChange: Date,
}, {
  toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
})

const nextChangeKmData = {
  oil: 10000,
  filterOil: 20000,
  breaksKit: 40000,
  ac: 30000, 
  tires: 40000, 
  airFilter: 30000, 
  battery: 80000, 
  suspension: 60000, 
  chain: 120000, 
  coolant: 40000
}

const nextChangeTimeData = {
  oil: 1,
  filterOil: 2,
  breaksKit: 2,
  ac: 2, 
  tires: 4, 
  airFilter: 4, 
  battery: 4, 
  suspension: 5, 
  chain: 5, 
  coolant: 2
}

const nextRevisionKmData = {
  
  suspension: 30000, 
  chain: 80000, 
  coolant: 40000,
  plugs: 50000,
  heaters: 50000,
  batteryCoolant: 70000
}

const nextRevisionTimeData = {
  
  ITV: 4 || 2 || 1,
  
}

MaintenanceEventSchema.virtual('nextKmChange').get(function() {
  return this.kmLastChanged + nextChangeKmData[this.eventType] 
})

MaintenanceEventSchema.virtual('nextTimeChange').get(function() {
  return nextChangeTimeData[this.eventType] 
})

MaintenanceEventSchema.virtual('nextKmReview').get(function() {
  return nextRevisionKmData[this.eventType]
})

MaintenanceEventSchema.virtual('nextTimeReview').get(function() {
  return this.$parent.$parent._doc.year
})


const maintentanceEventFields = EVENTS.reduce((acc, event) => {
  return {
    ...acc,
    [event]: {
      type: MaintenanceEventSchema,
      default: {
        eventType: event
      }
    } 
  }
}, {})

const MaintenanceSchema = new mongoose.Schema({
  ...maintentanceEventFields
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

module.exports = MaintenanceSchema;