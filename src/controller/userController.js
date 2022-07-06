const User = require('../model/userModel');
const { getPostData } = require('../utils')
async function getUsers(req,res) {
    try {
        const users = await User.findAll();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify((users)));
    } catch (error) {
        console.log(error);
    }
};

async function getUser(req,res,id) {
    try {
        const user = await User.findById(id);
        if(!user) {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.end(JSON.stringify(("message: User not found!")));
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify((user)));
        }
        console.log(!user,'fdfdfdfdf');
    } catch (error) {
        console.log(error);
    }
}

async function createUser(req, res) {
    try { 
      const body = await getPostData(req);
      console.log(body);

      const {fullname,email,password,cfpassword} = JSON.parse(body);     
      const user = {
        fullname,
        email,
        password,
        cfpassword
      };
      console.log(user)
      const newUser = await User.create(user);
      res.writeHead(200, {"Content-Type": "application/json"});
      return res.end(JSON.stringify(newUser));  
      }
    catch(error) {
      console.log(error);
    }
  };
async function matchUser(req,res) {
    try {
        const body = await getPostData(req);
        console.log(body);
        const {email,password} = JSON.parse(body);     
        const user = {
            email,
            password
        };
        console.log(user) 
        const matchUser = await User.matchUser(user);    
        console.log('check',matchUser);
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    matchUser
}
