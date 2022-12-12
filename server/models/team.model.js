const ModelBase = require('../utils/model-base');

const name = 'team';
const tableName = 'team';

module.exports = (db) => {
  const modelbase = ModelBase({ name, tableName, db });

  return modelbase;
}