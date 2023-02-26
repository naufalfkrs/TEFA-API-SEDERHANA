
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneUser(document){
    const { username, password} = document;
    const result = await this.db.prepareQuery(
      "INSERT INTO user (username, password) VALUES (?,?)",
      [username, password]
    );
    return result;
  }

  async deleteUser(id){
    const result = await this.db.prepareQuery(
      "DELETE FROM user WHERE id = ?",
      id
    );
    return result;
  }
}

module.exports = Command;
