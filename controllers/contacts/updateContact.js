const { NotFound } = require('http-errors');

// const contactsOperations = require('../../models/contacts');
const {Contact} = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json(result);
};

module.exports = updateContact;

