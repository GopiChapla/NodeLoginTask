require("dotenv").config();
const db = require("../models/index");
const user = db.User;
const jwt = require("jsonwebtoken");

//Login
const getUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await user
    .findOne({ email: email })
    .then((data) => {
      if (data.password === password) {
        jwt.sign({ data }, process.env.JWT_SECRET_KEY, (err, token) => {
          if (!err) {
            res.status(200).json(token);
          }
        });
      } else {
        res.status(404).send({ message: "User Not Found." });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Add User
const addUser = async (req, res) => {
  const userInfo = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email
  };
  await user
    .create(userInfo)
    .then((data) => {
      console.log(data);
      jwt.sign({ data }, process.env.JWT_SECRET_KEY, (err, token) => {
        res.status(201).json(token);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUser,
  addUser
};
