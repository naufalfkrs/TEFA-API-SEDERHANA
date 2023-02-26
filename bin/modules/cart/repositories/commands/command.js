class Command {
  constructor(db) {
    this.db = db;
  }

  async insertOneCart(document){
    const { produk, harga, keterangan} = document;
    const result = await this.db.prepareQuery(
      "INSERT INTO cart (produk, harga, keterangan) VALUES (?,?,?)",
      [produk, harga, keterangan]
    );
    return result;
  }

  async updateOneCart(document, id){
    const { produk, harga, keterangan } = document;
    const result = await this.db.prepareQuery(
      "UPDATE cart SET produk = ?, harga = ?, keterangan = ? WHERE id = ?",
      [produk, harga, keterangan, id]
    );
    return result;
  }

  async deleteOneCart(id){
    const result = await this.db.prepareQuery(
      "DELETE FROM cart WHERE id = ?", 
      id
    );
    return result;
  }
}

module.exports = Command;
