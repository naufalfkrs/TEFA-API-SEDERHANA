const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class Cart {
  constructor(db){
    this.query = new Query(db);
  }

  async getListCheckout() {
    const cart = await this.query.findAll();
    if (cart.err) {
      return wrapper.error(new NotFoundError('Can not find list checkout'));
    }
    const { data } = cart;
    return wrapper.data(data);
  }

  async getCartById(id) {
    const cart = await this.query.findById(id);
    if (cart.err) {
      return wrapper.error(new NotFoundError('Can not find list checkout'));
    }
    const { data } = cart;
    return wrapper.data(data);
  }
}

module.exports = Cart;
