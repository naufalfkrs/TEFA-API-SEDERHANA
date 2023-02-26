const joi = require('joi');

const cart = joi.object({
  produk: joi.string().required(),
  harga: joi.string().required(),
  keterangan: joi.string().required(),
});

module.exports = {
  cart,
};
