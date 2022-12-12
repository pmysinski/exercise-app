const yup = require('yup');

const body = yup.object({
  name: yup.string().min(1).max(100).required(),
});

const postSchema = yup.object({
  body,
});

const patchSchema = yup.object({
  body,
  params: yup.object({
    id: yup.number().required(),
  }),
});

module.exports = {
  postSchema,
  patchSchema
}


