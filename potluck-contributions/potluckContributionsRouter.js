const router = require("express").Router();
const PotluckContributions = require("./potluckContributions-model.js");

router.post("/", async (req, res) => {
    try {
const contributionInfo = {
  user_id: req.body.user_id || null,
  potluck_id: req.body.potluck_id,
  contribution_id: req.body.contribution_id
};

    } catch (err) {
        console.log("potluck contributions post error", err);
        res.status(500).json({
          message: "there was an error creating this contributions",
          error: err
        });
    }
})

router.put("/:id", async (req, res) => {
  try {
    const contributionInfo = {
      id: req.params.id,
      user_id: req.body.user_id,
      potluck_id: req.body.potluck_id,
      contribution_id: req.body.contribution_id
    };
    const contribution = await PotluckContributions.assignContribution(
      contributionInfo,
      req.params.id
    );
    res.status(200).json(contribution);
  } catch (err) {
    console.log("potluck contributions put error", err);
    res.status(500).json({
      message: "there was an error assigning this contributions",
      error: err
    });
  }
});

module.exports = router;
