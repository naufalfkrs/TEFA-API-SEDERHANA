
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class User {

  constructor(db){
    this.query = new Query(db);
  }

  async viewUser() {
    const user = await this.query.findAll();
    if (user.err) {
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = user;
    return wrapper.data(data);
  }

}

module.exports = User;
