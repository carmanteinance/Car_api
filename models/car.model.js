const mongoose = require("mongoose");

const constants = require("./BBDD_Cars");
const MaintenanceSchema = require("./maintenance.schema");

const CarSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
    km: {
      type: Number,
      required: true
    },
    year: {
      type: Date,
      required: true
    },
    imageURl: {
      type: String
    },
    maintenance: {
      type: MaintenanceSchema,
      default: {}
    },
    lastITV: {
      type: Date,
      default: function() {
        return Date.now();
      }
    }
  },
  {
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
  }
);

CarSchema.virtual("nextITV").get(function() {
  const yearToday = new Date().getFullYear();

  if (yearToday - this.year <= 4) {
    // new Intl.DateTimeFormat('en-GB').format(year)
    return (this.nextITV = 4 + this.lastITV.getFullYear());
  } else if (yearToday - this.year >= 10) {
    return (this.nextITV = 1 + this.lastITV.getFullYear());
  } else return (this.nextITV = this.lastITV.setYear(2));
});

CarSchema.pre("save", function(next) {
  if (this.isNew) {
    //this.lastITV = this.year;
  } else {
    this.lastITV = this.lastITV;
  }

  next();
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
