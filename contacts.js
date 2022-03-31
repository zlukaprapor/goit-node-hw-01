// contacts.js
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '/db/contacts.json');

const readContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(result);
  return contacts;
};

// TODO: задокументировать каждую функцию
function listContacts() {
  return readContacts();
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
