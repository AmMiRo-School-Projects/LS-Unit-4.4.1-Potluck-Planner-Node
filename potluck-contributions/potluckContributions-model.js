const db = require("../database/db-config.js");

module.exports = {
  findContributionBy,
  insertContribution,
  assignContribution
};

function findContributionBy(filter) {
  return db("potluck_contributions")
    .where( filter )
    .first();
}

function insertContribution(contribution) {
    const [id] = db("potluck_contributions").insert(contribution, "id");
    return findContributionBy({id});
}

function assignContribution(contribution, id) {
  return db("potluck_contributions")
    .where({ id })
    .update(contribution)
    .then(() => {
      return findContributionBy(id);
    });
}
