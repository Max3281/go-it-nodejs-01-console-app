const { program } = require("commander");
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "get":
      const getContact = await contacts.getContactById(id);
      return console.log(getContact);
    case "add":
      const newContact = contacts.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const remove = contacts.removeContact(id);
      return console.log(remove);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("--action, <type>")
  .option("--id, <type>")
  .option("--name, <type>")
  .option("--email, <type>")
  .option("--phone, <type>");

program.parse();

const options = program.opts();
invokeAction(options);
