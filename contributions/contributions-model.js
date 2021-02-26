const db = require("../database/db-config.js");

module.exports = {
    findContributions,
    findContributionBy,
    findPotluckContributions,
    insertContribution
};

function findContributions() {
    return db("contributions");
};

function findContributionBy(filter) {
    return db("contributions").where(filter).first();
};

function insertContribution(contribution) {
    const [id] = await db("contributions").insert(contribution, "id");
  return findContributionBy({id});
};