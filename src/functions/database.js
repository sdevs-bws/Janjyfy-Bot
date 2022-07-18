const mysql = require('mysql');

class Database {
  constructor(login) {
    this.connection = mysql.createConnection(login);
  }
  query(sql, multiRow = false) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (error, rows) => {
        if (error) return reject(error);
        if (rows.length < 1 && multiRow) rows = undefined;
        (multiRow) ? resolve(rows) : resolve(rows[0]);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(error => {
        if (error) return reject(error);
        resolve();
      });
    });
  }
}

module.exports = Database