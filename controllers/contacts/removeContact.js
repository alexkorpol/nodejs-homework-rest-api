const { NotFound } = require('http-errors');

const contactsOperations = require('../../models/contacts');

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json({
    message: 'contact deleted',
  });  
};

module.exports = removeContact;
 
