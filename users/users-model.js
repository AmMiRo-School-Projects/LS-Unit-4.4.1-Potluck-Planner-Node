const db = require("../database/db-config.js");

module.exports = {
  findUsers,
  findUserBy,
  findUserById,
  findPotlucksbyUser,
  insertUser,
  updateUser,
  removeUser
};

function findUsers() {
  return db("users").select("id", "username", "email");
}

function findUserBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function findUserById(id) {
  return db("users")
    .select("id", "username", "email")
    .where({ id })
    .first();
}

function findPotlucksbyUser(user_id) {
  return db
    .select(
      "potlucks.id",
      "potlucks.name",
      "potlucks.location",
      "potlucks.date",
      "potlucks.time",
      "potlucks.description",
      "potluck_users.attending"
    )
    .from("potlucks")
    .join("potluck_users", "potlucks.id", "=", "potluck_users.potluck_id")
    .where("potluck_users.user_id", "=", user_id);
}

async function insertUser(user) {
  const [id] = await db("users").insert(user, "id");
  return findUserById(id);
}

function updateUser(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return findUserById(id);
    });
}

async function removeUser(id) {
  const user = await findUserById(id);
  db("users")
    .where({ id })
    .del();
  return user;
}
