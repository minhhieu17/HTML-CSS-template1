const users = require('../data/users.json');
const { v4: uuidv4 } = require("uuid");
const path = require("path")

const { writeDataToFile } = require('../utils');


function findAll() {
    return new Promise((resolve,reject) => {
        resolve(users)
    })
};

function findById(id) {
    return new Promise((resolve,reject) => {
        const user = users.find((u) => u.id === id);
        console.log(user)
        resolve(user);
    })
};

function create(user) {
    return new Promise((resolve,reject) => {
        const newUser = { id: uuidv4(), ...user};
        users.push(newUser);
        writeDataToFile(path.join(__dirname, '../data/users.json')  , users);
        resolve(newUser);
    })
};
function matchUser({email,password}) {
    return new Promise((resolve,reject) => {
        const user = users.find((u => {
           return u.email === email && u.password === password
        }));
        console.log('user',user)
        resolve(user);
    })
};
module.exports = {
    findAll,
    findById,
    create,
    matchUser
}