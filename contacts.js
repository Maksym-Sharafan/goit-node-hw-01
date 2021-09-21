const fs = require('fs').promises;
const path = require('path');
const { v4  } = require('uuid') ;

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    const allContacts = await fs.readFile(contactsPath, 'utf8');
    const parsedAllContacts = JSON.parse(allContacts);
    console.table(parsedAllContacts)
    return parsedAllContacts;
};

async function getContactById(id) {
    const contactId = isNaN(id) ? id : Number(id);

    const allContacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(allContacts);
    const contactById = parsedContacts.find((contact) => contact.id === contactId);
    if (!contactById) {
        console.log('There is no contact with such an id!');
        return;
    }
    console.log(contactById);
    return contactById;
};

async function removeContact(id) {
    const contactId = isNaN(id) ? id : Number(id);
    const allContacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(allContacts);
    const deleteContactById = JSON.stringify(parsedContacts.filter((contact) => contact.id !== contactId));
    await fs.writeFile(contactsPath, deleteContactById, 'utf8');
    console.log(`Contact with id ${contactId} deleted`)
};


async function addContact(name, email, phone) {
    if (!name || !email || !phone) {
        console.log('Input: name, email, phone!');
        return;
    }
   const allContacts = await fs.readFile(contactsPath, 'utf8');
    const parsedPrevUsers = JSON.parse(allContacts);
    
    const user = {
        id: v4(),
        name,
        email,
        phone,
    };
    
        const allUsers = parsedPrevUsers.concat([user]);
        const allUsersJSON = JSON.stringify(allUsers);
        fs.writeFile(contactsPath, allUsersJSON, 'utf8');
        console.log(`Contact with name ${name} is added`)
};

const contacts = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

module.exports = contacts;

