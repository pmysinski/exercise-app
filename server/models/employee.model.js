const ModelBase = require('../utils/model-base');

const name = 'employee';
const tableName = 'employee';

module.exports = (db) => {
  const modelbase = ModelBase({ name, tableName, db });

  return modelbase;
}