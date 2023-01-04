/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity 
  try {
  const { rows: [activities] } = await client.query 
   (`
   INSERT INTO activities ("name", "description")
   VALUES ($1, $2)
   RETURNING *;
   `, [name, description])
 
   return activities;
 
  } catch (error) {
    throw error
  }
   
 }

async function getAllActivities() {
  // select and return an array of all activities
  try { 
    const { rows: activitiesName } = await client.query(`
      SELECT name
      FROM activities
    `);

    const activities = await Promise.all(activitiesName.map(
      activities => getActivityById (activity.name)
    ));

    return activities;

  } catch (error) {
    throw (error)
  }
}

async function getActivityById(id) { 
  try {
    const { rows: [ activity ]  } = await client.query(`
      SELECT *
      FROM activities
      WHERE id=$1;
    `, [id]);

    return activity;
    
  } catch (error) {
    throw error
  }
  
 }

async function getActivityByName(name) { 
  // eslint-disable-next-line no-useless-catch
  try {
    const { rows: [ activities ] } = await client.query( `
      SELECT name 
      FROM activities
      WHERE id=${ name }
    `)
    return activities;

  } catch (error) {
    throw error
  }
}

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




//   try {
//     const { rows: [] } = await client.query(`
//     SELECT * FROM 
//     `, [])
//   } catch (error) {
//     throw error;
//   }