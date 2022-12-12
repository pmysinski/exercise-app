const express = require('express');
const { create, update } = require('../../controllers/team.controller');
const validate = require('../../middlewares/validator');
const { postSchema, patchSchema } = require('../../schemas/team.schema');

module.exports = (serverContext) => {
  const router = express.Router();
  const { models } = serverContext;

  router.post('/', validate(postSchema), create(models));
  router.patch('/:id', validate(patchSchema), update(models));

  return router;
};
