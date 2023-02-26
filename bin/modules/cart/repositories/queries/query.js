class Query {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    const recordset = await this.db.prepareQuery(
      "SELECT * FROM cart WHERE id = ?",
      id
    );
    return recordset;
  }

  async findAll() {
    const recordset = await this.db.prepareQuery(
      "SELECT * FROM cart"
    );
    return recordset;
  }
}

module.exports = Query;
