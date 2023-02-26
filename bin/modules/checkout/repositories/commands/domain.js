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
    const { payload: result } = await this.command.checkout(payload)
    const { payload: resultDetail } = await this.command.detail_pembelian(payload)
    return wrapper.data( result, resultDetail);
  }

  async delete(id) {
    const cart = await this.query.findById(id)

    if (!cart.data) {
      return wrapper.error(new NotFoundError("No Detail Pembelian Founds"))
    }
    const { data: result } = await this.command.deleteDetailPembelian(id);
    return wrapper.data(result);
  }
}

module.exports = Cart;
