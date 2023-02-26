class Command {
  constructor(db) {
    this.db = db;
  }

  async checkout(document){
    const { id_produk, id_user, harga, qty} = document;
    const result = await this.db.prepareQuery(
      "INSERT INTO checkout (id_produk, id_user, harga, qty) VALUES (?,?,?,?)",
      [id_produk, id_user, harga, qty]
    );
    return result;
  }

  async detail_pembelian(document){
    const { id_produk, id_user, harga, qty, total_harga=(qty*harga)} = document;
    const result = await this.db.prepareQuery(
      "INSERT INTO detail_pembelian (id_produk, id_user, harga, qty, total_harga) VALUES (?,?,?,?,?)",
      [id_produk, id_user, harga, qty, total_harga]
    );
    return result;
  }

  async deleteDetailPembelian(id){
    const result = await this.db.prepareQuery(
      "DELETE FROM detail_pembelian WHERE id = ?", 
      id
    );
    const resultCheckout = await this.db.prepareQuery(
      "DELETE FROM checkout WHERE id = ?", 
      id
    );
    return result, resultCheckout;
  }
}

module.exports = Command;
