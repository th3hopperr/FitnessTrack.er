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
    ON CONFLICT (username) DO NOTHING
    RETURNING *;

    `, [username, hashedPassword])

    delete user.password;

    return user;

  } catch (error) {
    throw error;

  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }

}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT * FROM USERS
    WHERE id = ${userId}
    `);

    if (!user) {
      return null;
    }

    delete user.password;
    return user;

  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT * FROM users
    WHERE username =$1;
    `, [userName]);

    return user;
  } catch (error) {
    throw error;
  }

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
const girl = women;
// ya boi
// by thursday morning if you arent on apis then let sean know.