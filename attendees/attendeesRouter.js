const router = require("express").Router();

const Attendees = require("./attendees-model.js");

router.post("/", async (req, res) => {
  try {
    const invitation = {
      user_id: req.body.user_id,
      potluck_id: req.body.potluck_id,
      attending: false
    };
    const invitedUser = await Attendees.inviteToPotluck(invitation);
    res.status(201).json(invitedUser);
  } catch (err) {
    console.log("attendees post error", err);
    res.status(500).json({
      message: "there was an error sending this invitation",
      error: err
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const rsvp = {
      user_id: req.body.user_id,
      potluck_id: req.body.potluck_id,
      attending: true
    };
    const attendedPotluck = await Attendees.acceptInvitation(rsvp);
    res.status(200).json(attendedPotluck);
  } catch (err) {
    console.log("attendees put error", err);
    res.status(500).json({
      message: "there was an error RSVPing to this event",
      error: err
    });
  }
});

module.exports = router;
