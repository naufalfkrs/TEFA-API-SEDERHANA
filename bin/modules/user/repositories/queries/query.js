class Query {

  constructor(db) {
    this.db = db;
  }

  async findOneUser(parameter) {
    const recordset = await this.db.prepareQuery(
      "SELECT * FROM user WHERE username = ?",
      parameter
    );
    return recordset;
  }

  async findUserById(id) {
    const recordset = await this.db.prepareQuery(
      "SELECT * FROM user WHERE id = ?",
      id
    );
    return recordset;
  }

  async findAll() {
    const recordset = await this.db.prepareQuery(
      "SELECT * FROM user"
    );
    return recordset;
  }

}

module.exports = Query;
