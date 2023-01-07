/* eslint-disable no-useless-catch */
const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: [routine] } = await client.query(`
    INSERT INTO routines ("creatorId", "isPublic", name, goal)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [creatorId, isPublic, name, goal]);

    // console.log('look here dumbass-----', routines)

    return routine;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const { rows: [routine] } = await client.query(`
    SELECT *
    FROM routines
    WHERE id = $1;
    `, [id]);

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `)
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    `);

    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
    FROM activities
    JOIN routine_activities ON routine_activities."activityId" = activities.id
    `)

    for (const routine of routines) {
      const activitiesToAdd = activities.filter((activity) => activity.routineId === routine.id)


      routine.activities = activitiesToAdd
    }

    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() { 
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    WHERE "isPublic" = true
    `);

    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
    FROM activities
    JOIN routine_activities ON routine_activities."activityId" = activities.id
    `)

    for (const routine of routines) {
      const activitiesToAdd = activities.filter((activity) => activity.routineId === routine.id)


      routine.activities = activitiesToAdd
    }

    return routines;
  } catch (error) {
    throw error;
  }
 }

async function getAllRoutinesByUser({ username }) { 
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines 
    JOIN users ON routines."creatorId" = users.id
    `);

    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
    FROM activities
    JOIN routine_activities ON routine_activities."activityId" = activities.id;
    `)

    for (const routine of routines) {
      const activitiesToAdd = activities.filter((activity) => activity.routineId === routine.id)


      routine.activities = activitiesToAdd
    }

    return routines;
  } catch (error) {
    throw error;
  }
 }

async function getPublicRoutinesByUser({ username }) { 
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    `);

    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
    FROM activities
    JOIN routine_activities ON routine_activities."activityId" = activities.id
    `)

    for (const routine of routines) {
      const activitiesToAdd = activities.filter((activity) => activity.routineId === routine.id)


      routine.activities = activitiesToAdd
    }

    return routines;
  } catch (error) {
    throw error;
  }
 }

async function getPublicRoutinesByActivity({ id }) { 
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    `);

    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
    FROM activities
    JOIN routine_activities ON routine_activities."activityId" = activities.id
    `)

    for (const routine of routines) {
      const activitiesToAdd = activities.filter((activity) => activity.routineId === routine.id)


      routine.activities = activitiesToAdd
    }

    return routines;
  } catch (error) {
    throw error;
  }
 }

async function updateRoutine({ id, ...fields }) { }

async function destroyRoutine(id) { }

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
// .*, users.username AS "creatorName"
//     FROM routines
//     JOIN users ON routines."creatorId" = "users.id"