
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mysqlConfig'));

const postDataLogin = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.generateCredential(payload);
  return postCommand(payload);
};

const registerUser = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.register(payload);
  return postCommand(payload);
};

const deleteUser = async (id) => {
  const user = new User(db);
  const postCommand = async (id) => user.delete(id);
  return postCommand(id);
};

module.exports = {
  postDataLogin,
  registerUser,
  deleteUser,
};
