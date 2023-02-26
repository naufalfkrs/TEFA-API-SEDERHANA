const Cart = require('./domain');
const Mysql = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mysql(config.get('/mysqlConfig'));

const insertCart = async (payload) => {
  const cart = new Cart(db);
  const postCommand = async (payload) => cart.create(payload);
  return postCommand(payload);
};
 
const updateCart = async (payload, id) => {
  const cart = new Cart(db);
  const postCommand = async (payload, id) => cart.update(payload, id);
  return postCommand(payload, id);
};

const deleteCart = async (id) => {
  const cart = new Cart(db);
  const postCommand = async (id) => cart.delete(id);
  return postCommand(id);
};

module.exports = {
  insertCart,
  updateCart,
  deleteCart,
};
