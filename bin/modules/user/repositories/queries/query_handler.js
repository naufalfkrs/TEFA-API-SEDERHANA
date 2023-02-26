
const User = require('./domain');
const Mysql = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mysql(config.get('/mysqlConfig'));
const user = new User(db);

const getUser = async () => {
  const getData = async () => {
    const result = await user.viewUser();
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getUser
};
