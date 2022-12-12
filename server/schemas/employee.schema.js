const yup = require('yup');

const first_name = () => yup.string().min(1).max(100);
const last_name = () => yup.string().min(1).max(100);
const role = () => yup.string().min(1).max(100);
const team_id = () => yup.number();
const manager_id = () => yup.number();
const first_day_at_work = () => yup.date();

const postSchema = yup.object({
  body: yup.object({
    first_name: first_name().required(),
    last_name: last_name().required(),
    role: role().required(),
    team_id: team_id().required(),
    manager_id: manager_id(),
    first_day_at_work: first_day_at_work()
  }),
});

const patchSchema = yup.object({
  body: yup.object({
    first_name: first_name(),
    last_name: last_name(),
    role: role(),
    team_id: team_id(),
    manager_id: manager_id(),
    first_day_at_work: first_day_at_work()
  }),
  params: yup.object({
    id: yup.number().required(),
  }),
});

module.exports = {
  postSchema,
  patchSchema
}


