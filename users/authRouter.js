const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./users-model");
const { jwtSecret } = require("../config/secret.js");

router.post("/register", async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
    userInfo.password = hash;
    const newUser = await Users.insertUser(userInfo);
    res.status(201).json(newUser);
  } catch (err) {
    console.log("user register post error", err);
    res.status(500).json({
      message: "there was an error registering a new user",
      error: err
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await Users.findUserBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ user: user, token: token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log("user register post error", err);
    res.status(500).json({
      message: "there was an error logging in",
      error: err
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: 1000 * 60 * 60 * 24
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
