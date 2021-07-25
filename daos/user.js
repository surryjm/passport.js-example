const mongoose = require('mongoose');
const User = require('../models/user');
module.exports = {};

// createUser(userObj) - should store a user record
module.exports.createUser = async (userObj) => {
  try {
    const user = await User.create(userObj);
    return user;
  } catch (e) {
    return null;
  }
}

// getUser(email) - should get a user record using their email
module.exports.getUser = (email) => {
  // if (!mongoose.Types.ObjectId.isValid(email)) {
  //   return null;
  // }
  return User.findOne({ email: email }).lean();
}

// updateUserPassword(userId, password) - should update the user's password field
module.exports.updateUserPassword = (userId, password) => {
  return User.updateOne({ userId }, password);
  // try {
  //   const user = await User.findOneAndUpdate({ _id: userId }, password, { new: true }).lean();
  //   return user;
  // } catch (e) {
  //   return null;
  // }
}




