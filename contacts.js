const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const chalk = require('chalk');

const contactsPath = path.join(__dirname, '/db/contacts.json');

const readContacts = async () => {
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  return contacts;
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  console.table(contacts);
};

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const result = contacts.find((item) => item.id === contactId);

    return result;
  } catch (error) {
    return console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);

    if (idx === -1) {
      return console.error(
        chalk.red(`Contact with ID ${contactId} not found!`)
      );
    }

    const [removeContactId] = contacts.splice(idx, 1);
    console.log(
      chalk.green('Contact deleted successfully! New list of contacts:')
    );
    await updateContacts(contacts);
    return removeContactId;
  } catch (error) {
    return console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    )
      return console.warn(chalk.yellow('This name already exists!'));

    if (contacts.find((contact) => contact.email === email))
      return console.warn(chalk.yellow('This email already exists!'));

    if (contacts.find((contact) => contact.phone === phone))
      return console.warn(chalk.yellow('This phone already exists!'));

    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(chalk.green('Add new contact!'));
    console.log(newContact);
    console.log(chalk.green('New list of contacts:'));
    await updateContacts(contacts);
  } catch (error) {
    return console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
