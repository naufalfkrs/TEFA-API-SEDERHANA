class Query {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    const recordset = await this.db.prepareQuery(
      "SELECT * FROM detail_pembelian WHERE id = ?",
      id
    );
    return recordset;
  }

  async findAll() {
    const recordset = await this.db.prepareQuery(
      "SELECT * FROM detail_pemebelian"
    );
    return recordset;
  }
}

module.exports = Query;
