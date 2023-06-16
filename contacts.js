const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const getAllContacts = await fs.readFile(`${contactsPath}`, "utf-8");
  return JSON.parse(getAllContacts);
}

async function getContactById(contactId) {
  const getAllContacts = await listContacts();
  const result = getAllContacts.find((item) => item.id === contactId);
  return result || null;
}

async function addContact(name, email, phone) {
  const currentContacts = await listContacts();
  const newContact = {
    id: nanoid(9),
    name,
    email,
    phone,
  };

  const conMerge = [...currentContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(conMerge, null, 2));
  return console.log(newContact);
}

async function removeContact(contactId) {
  const getAllContacts = await listContacts();

  const filterContacts = getAllContacts.filter((fil) => fil.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts, null, 2));
  return console.log(filterContacts);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
