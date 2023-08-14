const { NotFound } = require('http-errors');
const {Contact} = require("../../models/contacts");

// const contactsOperations = require('../../models/contacts');

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json(result);
};

module.exports = getById;


