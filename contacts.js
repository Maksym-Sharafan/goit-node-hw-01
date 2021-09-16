const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    const allContacts = await fs.readFile(contactsPath, 'utf8');
    const parsedAllContacts = JSON.parse(allContacts);
    console.table(parsedAllContacts)
    return parsedAllContacts;
};

async function getContactById(id) {
    const allContacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(allContacts);
    const contactById = parsedContacts.find((contact) => contact.id === Number(id));
    console.log(contactById);
    return contactById;
};

async function removeContact(contactId) {
    const allContacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(allContacts);
    const deleteContactById = JSON.stringify(parsedContacts.filter(({ id }) => id !== Number(contactId)));  
    fs.writeFile(contactsPath, deleteContactById, 'utf8');
    console.log(`Contact with id ${contactId} deleted`)
};


async function addContact(name, email, phone) {
    const prevUsers = await fs.readFile(contactsPath, 'utf8');
    const parsedPrevUsers = JSON.parse(prevUsers);
    const user = {
        id: parsedPrevUsers.length + 1,
        name,
        email,
        phone,
    };
    
    if (user.name && user.email && user.phone) {
        const allUsers = parsedPrevUsers.concat([user]);
        const allUsersJSON = JSON.stringify(allUsers);
        fs.writeFile(contactsPath, allUsersJSON, 'utf8');
        console.log(`Contact with name ${name} is added`)
    }
};

const contacts = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

module.exports = contacts;

