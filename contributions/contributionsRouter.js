const router = require("express").Router();
const Contributions = require("./contributions-model.js");

router.get("/", async (req, res) => {
  try {
    const contributions = await Contributions.findContributions();
    res.status(200).json(contributions);
  } catch (err) {
    console.log("contributions get error", err);
    res.status(500).json({
      message: "there was an error getting the contributions",
      error: err
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const contributionInfo = {
      name: req.body.name
    };
    const addedContribution = await Contributions.insertContribution(
      contributionInfo
    );
    res.status(201).json(addedContribution);
  } catch (err) {
    console.log("contributions post error", err);
    res.status(500).json({
      message: "there was an error adding this contribution",
      error: err
    });
  }
});

module.exports = router;
