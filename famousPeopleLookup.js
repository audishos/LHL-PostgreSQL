const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  client.query(`SELECT * FROM famous_people
                WHERE first_name ILIKE '%' || $1::text || '%'
                OR last_name ILIKE '%' || $1::text || '%';`,
                [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name ${process.argv[2]}:`)
    for (row in result.rows) {
      const birthdate = `${result.rows[row].birthdate.getFullYear()}-${result.rows[row].birthdate.getMonth() + 1}-${result.rows[row].birthdate.getDate()}`;
      console.log(`${row + 1}: ${result.rows[row].first_name} ${result.rows[row].last_name}, born '${birthdate}'`)
    }
    // console.log(result.rows); //output: 1
    client.end();
  });
});