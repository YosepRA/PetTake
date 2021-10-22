const User = require('../models/User');

async function update(_, { changes }, { username }) {
  const updatedUser = await User.findOneAndUpdate({ username }, changes, {
    new: true,
  });

  return updatedUser;
}

async function changePassword(_, { oldPassword, newPassword }, { username }) {
  const user = await User.findByUsername(username);

  await user.changePassword(oldPassword, newPassword);

  return true;
}

module.exports = {
  update,
  changePassword,
};
