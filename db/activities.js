const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows: [activites] } = await client.query(`
    SELECT * FROM activites
    `, [activites])
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
}

async function getActivityById(id) { }

async function getActivityByName(name) { }

async function attachActivitiesToRoutines(routines) {
  // select and return an array of all activities
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
