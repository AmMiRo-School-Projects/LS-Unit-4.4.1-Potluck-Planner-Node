const router = require("express").Router();
const Potlucks = require("./potlucks-model.js");

router.get("/", async (req, res) => {
  try {
    const potlucks = await Potlucks.findPotlucks();
    res.status(200).json(potlucks);
  } catch (err) {
    console.log("potlucks get error", err);
    res
      .status(500)
      .json({ message: "there was an error getting the potlucks", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const potluck = await Potlucks.findPotluckById(req.params.id);
    res.status(200).json(potluck);
  } catch (err) {
    console.log("potlucks get by id error", err);
    res.status(500).json({
      message: "there was an error getting the potluck",
      error: err
    });
  }
});

router.get("/:id/users", async (req, res) => {
  try {
    const users = await Potlucks.findUsersByPotluck(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    console.log("potlucks get users by potluck error", err);
    res.status(500).json({
      message: "there was an error getting users for this potluck",
      error: err
    });
  }
});

router.get("/:id/contributions", async (req, res) => {
  try {
    const contributions = await Contributions.findPotluckContributions(
      req.params.id
    );
    res.status(200).json(contributions);
  } catch (err) {
    console.log("potluck contributions get error", err);
    res.status(500).json({
      message: "there was an error getting the contributions for this potluck",
      error: err
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const potluckInfo = {
      host_id: req.body.host_id,
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location
    };
    const potluck = await Potlucks.insertPotluck(potluckInfo);
    res.status(201).json(potluck);
  } catch (err) {
    console.log("potlucks post error", err);
    res.status(500).json({
      message: "there was an error creating potluck",
      error: err
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const potluckInfo = {
      host_id: req.body.host_id,
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location
    };
    const potluck = await Potlucks.updatePotluck(potluckInfo, req.params.id);
    res.status(200).json(potluck);
  } catch (err) {
    console.log("potlucks put error", err);
    res.status(500).json({
      message: "there was an error making changes to this potluck",
      error: err
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPotluck = await Potlucks.removePotluck(req.params.id);
    res.status(200).json(deletedPotluck);
  } catch (err) {
    console.log("potlucks delete error", err);
    res.status(500).json({
      message: "there was an error deleting this potluck",
      error: err
    });
  }
});

module.exports = router;
