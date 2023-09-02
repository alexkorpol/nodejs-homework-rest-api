const sendgrid = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, EMAIL_OF_SENDER } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

async function sendEmail(data) {
  const email = { ...data, from: EMAIL_OF_SENDER };
  try {
    await sendgrid.send(email);
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = sendEmail;
