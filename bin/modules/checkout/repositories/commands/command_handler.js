const Cart = require('./domain');
const Mysql = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mysql(config.get('/mysqlConfig'));

const checkout = async (payload) => {
  const cart = new Cart(db);
  const postCommand = async (payload) => cart.create(payload);
  return postCommand(payload);
};

const deleteDetail = async (id) => {
  const cart = new Cart(db);
  const postCommand = async (id) => cart.delete(id);
  return postCommand(id);
};

module.exports = {
  checkout,
  deleteDetail,
};
