const express = require('express');
const { create, update } = require('../../controllers/employee.controller');
const validate = require('../../middlewares/validator');
const { postSchema, patchSchema } = require('../../schemas/employee.schema');

module.exports = (serverContext) => {
  const router = express.Router();
  const { models } = serverContext;

  router.post('/', validate(postSchema), create(models));
  router.patch('/:id', validate(patchSchema), update(models));

  return router;
};
