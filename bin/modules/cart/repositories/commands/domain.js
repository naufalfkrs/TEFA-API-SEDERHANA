const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { ConflictError, InternalServerError, NotFoundError } = require('../../../../helpers/error');

class Cart {
  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async create(payload) {
    // const ctx = "domain-createCart"
    // const { produk, harga, keterangan} = payload;
    // const cart = await this.query.findAll()
    // if (cart.data) {
    //   logger.log(ctx, "cart alredy exist", "error");
    //   return wrapper.error(new ConflictError("cart alredy exist"))
    // }

    // const result = await this.command.insertOneCart(payload);
    // if (result.err) {
    //   logger.log(ctx, "cart failed to insert", "error")
    //   return wrapper.error(new InternalServerError("cart failed to insert"))
    // }
    // return wrapper.data(result.data);

    const { payload: result } = await this.command.insertOneCart(payload)
    return wrapper.data(result);
  }

  async update(payload, id) {
    const { payload: result } = await this.command.updateOneCart(payload, id)
    return wrapper.data(result);
  }

  async delete(id) {
    const cart = await this.query.findById(id)

    if (!cart.data) {
      return wrapper.error(new NotFoundError("No Cart Founds"))
    }
    const { data: result } = await this.command.deleteOneCart(id);
    return wrapper.data(result);
  }
}

module.exports = Cart;
