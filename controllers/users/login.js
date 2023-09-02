const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new Unauthorized('Email  is wrong');
  }

  if (!user.comparePassword(password)) {
    throw new Unauthorized('Password is wrong');
  }

  if (!user.verify) {
    throw new Unauthorized("Isn't verify");
  }
  
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {      
      email: user.email,
      subscription: user.subscription
    },
  });
};

module.exports = login;
