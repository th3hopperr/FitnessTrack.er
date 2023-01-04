/* eslint-disable no-useless-catch */
const client = require("./client");
const bcrypt = require("bcrypt")

// database functions

// user functions
async function createUser({ username, password }) {

  // make sure to hash the password beore storing it.

  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {

    const { rows: [user] } = await client.query(`
    INSERT INTO users (username, password)
    VALUES($1, $2)
    RETURNING *;

    `, [username, hashedPassword])

    return user;

  } catch (error) {
    throw error;

  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (passwordsMatch) {
    await client.query(` 
    SELECT * 
    FROM users`)
  } else {

    console.log('you dont have auth to be here.')
    throw Error;
  }

}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}


// by thursday morning if you arent on apis then let sean know.