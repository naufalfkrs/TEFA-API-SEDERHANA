const Cart = require('./domain');
const Mysql = require('../../../../helpers/databases/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mysql(config.get('/mysqlConfig'));
const cart = new Cart(db);

const getListCheckout = async () => {
  const getData = async () => {
    const result = await cart.getListCheckout();
    return result;
  };
  const result = await getData();
  return result;
};

const getCartById = async (id) => {
  const getData = async () => {
    const result = await cart.getCartById(id);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getListCheckout,
  getCartById,
};
