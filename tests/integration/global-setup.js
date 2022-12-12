const db = require('../../db');

const seedTestDatabase = async () => {
  await db.migrate.rollback(undefined, true);
  await db.migrate.latest();
}

module.exports = async () => {
  try {
    await seedTestDatabase();
    global.db = db;
    global.app = require('../../server/app');
    global.models = require('../../server/models/index')(db);
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}