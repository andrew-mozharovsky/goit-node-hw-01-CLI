const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) => {
  const contactToString = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactToString);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const searchedContact = await contacts.find(({ id }) => id === contactId);
    if (!searchedContact) {
      throw new Error(`no contact with id ${contactId}`);
    }
    return searchedContact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = await contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) {
      throw new Error(`no contact with id ${contactId}`);
    }
    const newContacts = await contacts.filter(({ id }) => id !== contactId);
    updateContacts(newContacts);

    return contacts[contactIndex];
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContactObj = {
      id: v4(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    const newContacts = [...contacts, newContactObj];
    updateContacts(newContacts);
    return newContactObj;
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
