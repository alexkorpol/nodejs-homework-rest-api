const contactsOperations = require('../../models/contacts');

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  console.log("🚀listContacts ~ contacts:", contacts)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
