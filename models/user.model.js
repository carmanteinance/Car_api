const mongoose = require ('mongoose');

const bcrypt = require ('bcrypt');
const SALT_WORK_FACTOR = 10;

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const userSchema = new mongoose.Schema({

    name:{
      type: String,
      trim: true,
      },

    email:{
      type: String,
      required: [true, 'The email is required'],
      unique: true,
      trim: true,
      match: [EMAIL_PATTERN, 'The email must have a correct format <example>@<example>.<example>']
      },

    password:{
      type: String,
      require: [true, 'You must have a password'],
      minlength: 6,
      match: [PASSWORD_PATTERN, 'Passwords must contain at least six characters, including uppercase, lowercase letters and numbers.']
      }

  },  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret.password 
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });

userSchema.virtual('car', {
  ref:'Car',
  localField:'_id',
  foreignField: 'user',
  options: {sort: {brand: -1}}
})

userSchema.pre('save', function(next) {
    
    if (!this.isModified('password')) {
      next();
    } else {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(this.password, salt)
            .then(hash => {
              this.password = hash;
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