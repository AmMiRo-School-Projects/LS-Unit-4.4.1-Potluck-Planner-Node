const db = require("../database/db-config.js");

module.exports = {
    findContribution,
    findContributionBy,
    insertContribution
};

function findContribution() {
    return db("contributions");
};

function findContributionBy(filter) {
    return db("contributions").where({filter});
};

function insertContribution(contribution) {
    const [id] = await db("contributions").insert(contribution, "id");
  return findContributionBy({id});
};