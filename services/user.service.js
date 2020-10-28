const User = require ('../models/user.model');


const registerUser = async ({ email, ...userData }) => {
  try {
    const user = User.findOne({ email })
    if (!user) {
      return new User({ ...userData, email, }).save();
    } else {
      throw new Error('User already exists');
    }
  } catch (ex) {
    throw ex;
  }
}

module.exports = {
  registerUser
}