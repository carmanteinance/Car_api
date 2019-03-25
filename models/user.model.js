const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({

    name:{
      type: String,
      trim: true,
      },

    email:{
      type: String,
      required: [true, 'The email is required'],
      unique: true,
      trim: true
      },

    password:{
      type: String,
      require: [true, 'You must have a password'],
      minlength: 6
      },

    vehicles: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car'
        }
      ]  
    }

  },  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        //delete ret.password 
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });

  userSchema.pre('save', function(next) {
    
    if (!this.isModified('password')) {
      next();
    } else {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(user.password, salt)
            .then(hash => {
              user.password = hash;
              next();
            })
        })
        .catch(error => next(error))
    }
  });
  
  userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }
  

const User = mongoose.model('User', userSchema);

module.exports = User;