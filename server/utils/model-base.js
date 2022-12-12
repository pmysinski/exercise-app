module.exports = ({
  db,
  name,
  tableName,
  selectableProps = [],
  timeout = 1000
}) => {
  const create = props => {
    delete props.id;

    return db.insert(props)
      .into(tableName)
      .timeout(timeout);
  }

  const find = (filters = {}) => db.select()
    .from(tableName)
    .where(filters)
    .timeout(timeout)

  const findOne = (filters = {}) => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });

  const findById = id => db.select()
    .from(tableName)
    .where({ id })
    .timeout(timeout);

  const update = (id, props) => {
    delete props.id;

    return db.update(props)
      .from(tableName)
      .where({ id })
      .timeout(timeout);
  }

  return {
    name,
    tableName,
    selectableProps,
    create,
    findOne,
    findById,
    update
  }
}