/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const LIMIT = 10;

async function paginate(filter, options) {
  const page = options.page || 1;
  const sort = options.sort || '-createdDate';
  const skip = (page - 1) * LIMIT;

  const docs = await this.find(filter).sort(sort).skip(skip).limit(LIMIT);
  const total = await this.countDocuments(filter);
  const pages = Math.ceil(total / LIMIT);

  return {
    page,
    pages,
    total,
    docs,
  };
}

module.exports = function (schema) {
  schema.statics.paginate = paginate;
};
