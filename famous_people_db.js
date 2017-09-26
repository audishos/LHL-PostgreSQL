const pg = require("pg");
const settings = require("./settings"); // settings.json
const config = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
};

module.exports = (() => {

  const client = new pg.Client(config);

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
  });

  const getFamousPeople = (name, callback) => {
    client.query(`SELECT * FROM famous_people
                  WHERE first_name ILIKE '%' || $1::text || '%'
                  OR last_name ILIKE '%' || $1::text || '%';`,
                  [process.argv[2]], (err, result) => {
      if (err) {
        callback(err, []);
      } else {
        callback(null, result)
      }
    });
  }

  return {
    getFamousPeople: getFamousPeople,
    closeConnection: () => {
      client.end();
    }
  }
})();