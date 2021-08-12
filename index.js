const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      (async () => {
        try {
          const contacts = await listContacts();
          console.log(contacts);
        } catch (error) {
          console.error(error);
        }
      })();
      break;

    case "get":
      (async () => {
        try {
          const listContactById = await getContactById(id);
          console.log(listContactById);
        } catch (error) {
          console.error(error);
        }
      })();
      break;

    case "add":
      (async () => {
        try {
          const addNewContact = await addContact(name, email, phone);
          console.log(addNewContact);
          console.log("Contact add success");
        } catch (error) {
          console.error(error);
        }
      })();
      break;

    case "remove":
      (async () => {
        try {
          const delContact = await removeContact(id);
          console.log(delContact);
          console.log("Contact deleted");
        } catch (error) {
          console.error(error);
        }
      })();
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
