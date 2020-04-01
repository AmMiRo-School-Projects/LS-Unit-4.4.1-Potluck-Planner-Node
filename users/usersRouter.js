const router = require("express").Router();
const Users = require("./users-model.js");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  try {
    const users = await Users.findUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log("users get error", err);
    res.status(500).json({
      message: "there was an error getting the users",
      error: err
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log("users get by id error", err);
    res.status(500).json({
      message: "there was an error getting this user",
      error: err
    });
  }
});

router.get("/:id/potlucks", async (req, res) => {
  try {
    const potlucks = await Users.findPotlucksbyUser(req.params.id);
    res.status(200).json(potlucks);
  } catch (err) {
    console.log("users get potlucks error", err);
    res.status(500).json({
      message: "there was an error getting potlucks for this user",
      error: err
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
    userInfo.password = hash;
    const updatedUser = await Users.updateUser(userInvo, req.params.id);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("users put error", err);
    res.status(500).json({
      message: "there was an error making changes to this user",
      error: err
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.removeUser(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    console.log("users delete error", err);
    res.status(500).json({
      message: "there was an error deleting this user",
      error: err
    });
  }
});

module.exports = router;
