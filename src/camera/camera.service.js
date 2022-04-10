const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into cameras(id, cam) values(?,?)`,
      [data.id, data.cam],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCamera: (callBack) => {
    pool.query(`select * from cameras`, [], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getCameraById: (id, callBack) => {
    pool.query(
      `select * from cameras where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
