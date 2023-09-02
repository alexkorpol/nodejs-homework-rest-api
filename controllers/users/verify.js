const { Unauthorized, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const verify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized('Email  is wrong');
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }
 
  if (!user.verify) {
    const mail = {
      to: user.email,
      subject: 'Confirm your email',
      html: `<a target="_blank" href="http://${BASE_URL}/users/verify/${user.verificationToken}">Click to verify email</a>`,
    };

      await sendEmail(mail);
      res.status(200).json(
       { message: "Verify email send success" }
      );
  }
};

module.exports = verify;
