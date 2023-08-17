const {Contact} = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
};

module.exports = listContacts;
