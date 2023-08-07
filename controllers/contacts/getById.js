const { NotFound } = require('http-errors');

const contactsOperations = require('../../models/contacts');

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.getById(id);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json(result);
};

module.exports = getById;
