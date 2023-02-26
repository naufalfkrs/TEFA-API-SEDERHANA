const joi = require('joi');

const checkout = joi.object({
  id_produk: joi.number().integer(),
  id_user: joi.number().integer(),
  harga: joi.number().integer(),
  qty: joi.number().integer(),
});

module.exports = {
  checkout,
};
