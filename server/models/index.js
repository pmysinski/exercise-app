'use strict'

const fs = require('fs');
const path = require('path');

const getModelFiles = dir => fs.readdirSync(dir)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .map(file => path.join(dir, file));

const createModels = (db) => {
  const files = getModelFiles(__dirname);

  const models = files.reduce((modelsObj, filename) => {
    const initModel = require(filename);
    const model = initModel(db);

    if (model) {
      modelsObj[model.name] = model;
    }

    return modelsObj;
  }, {});
  return models;
}


module.exports = createModels;