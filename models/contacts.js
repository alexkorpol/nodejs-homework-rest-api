const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const contactsPath = require('./contactsPath');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContactsAll(newContacts);
  return contacts[idx];
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);
  await updateContactsAll(contacts);
  return newContact;
};

const updateContactsAll = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await updateContactsAll(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
    
