const users = require('../data/users.json');
const fs = require('fs')
function writeDataToFile(filename, Content) {
    fs.writeFileSync(filename, JSON.stringify(Content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
};
const { v4: uuidv4 } = require("uuid");
const path = require("path");
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
};
function findById(id) {
    return new Promise((resolve,reject) => {
        const user = users.find((u) => u.id === id);
        resolve(user);
    })
};

function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = { id: uuidv4(), ...user };
        users.push(newUser);
        writeDataToFile(path.join(__dirname, '../data/users.json'), users);
        resolve(newUser);
    })
};
function findUser({ email }) {
    return new Promise((resolve, reject) => {
        const user = users.find((u => {
            return u.email === email
        }));
        resolve(user);
    })
};
module.exports = {
    findAll,
    create,
    findUser,
    findById
}