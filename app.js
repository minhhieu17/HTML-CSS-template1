const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const User = require("./src/model/userModel");
dotenv.config();
const PORT = process.env.PORT || 3000;

async function authenToken(req, res, next) {
  console.log("cookies", req.cookies);
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).send({ error: "Not authorized to access this resource" });
    return;
  }

  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(data.id);
    if (!user) {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/views/index.html");
});

app.get("/home", authenToken, function (req, res) {
  res.sendFile(__dirname + "/public/views/home.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/views/login.html");
});
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/public/views/register.html");
});
app.get("/api/users", authenToken, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
app.get("/api/user", authenToken, async (req, res) => {
  res.json(req.user);
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUser({ email });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 60 * 60;
          const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 4000,
          });
          res.status(200).json({
            message: "Logged in successfully",
            accessToken,
          });
        } else {
          res.status(400).json({ message: "Logged in not successfully" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

app.post("/logout", authenToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const checkEmailExist = await User.findUser({ email });
  if (checkEmailExist) {
    return res.status(400).json({ message: "Email already exist !" });
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      email,
      password: hash,
    });
    res.status(200).json({
      message: "User successfully created",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
