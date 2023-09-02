const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);

  newUser.save();
  // Отправка пользовабелю по почте токена для подтверждения по ссылке
  const mail = {
    to: email,
    subject: 'Confirm your email',
    html: `<a target="_blank" href="http://${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(mail);


  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = register;
