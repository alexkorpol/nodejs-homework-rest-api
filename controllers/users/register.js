const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');



const register = async(req, res)=> {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  };
    const avatarURL = gravatar.url(email);
    const newUser = new User({ name, email, avatarURL });
    newUser.setPassword(password);

  newUser.save();

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
}

module.exports = register;

