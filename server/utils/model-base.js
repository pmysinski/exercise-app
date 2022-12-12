
class DataBaseError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = ({
  db,
  name,
  tableName,
  selectableProps = [],
  timeout = 1000,
  ModelError,
}) => {
  const create = props => {
    delete props.id;

    return db.insert(props)
      .into(tableName)
      .timeout(timeout)
      .returning('id')
      .then(results => {
        if (!Array.isArray(results)) return results;

        return results[0];
      })
      .catch((e) => {
        throw new DataBaseError(e.detail, e.code);
      });
  }

  const find = (filters = {}) => db.select()
    .from(tableName)
    .where(filters)
    .timeout(timeout)
    .catch((e) => {
      throw new DataBaseError(e.detail, e.code);
    });

  const findOne = (filters = {}) => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results;

      return results[0];
    })
    .catch((e) => {
      throw new DataBaseError(e.detail, e.code);
    });


  const update = async (id, props) => {
    delete props.id;

    return db.update(props)
      .from(tableName)
      .where({ id })
      .timeout(timeout)
      .catch((e) => {
        throw new DataBaseError(e.detail, e.code);
      });
  }

  const destroy = id => db.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  return {
    name,
    tableName,
    selectableProps,
    create,
    findOne,
    update,
    destroy,
    DataBaseError,
    ModelError
  }
}