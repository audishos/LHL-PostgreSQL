const famousPeopleDb = require('./famous_people_db');

const name = process.argv[2];

console.log("Searching ...");

famousPeopleDb.getFamousPeople(name, (err, result) => {
  if (err) {
    console.error("error running query", err);
  } else {
    console.log(`Found ${result.rows.length} person(s) by the name ${process.argv[2]}:`)
    for (row in result.rows) {
      const birthdate = `${result.rows[row].birthdate.getFullYear()}-${result.rows[row].birthdate.getMonth() + 1}-${result.rows[row].birthdate.getDate()}`;
      console.log(`${row + 1}: ${result.rows[row].first_name} ${result.rows[row].last_name}, born '${birthdate}'`)
    }
  }
  famousPeopleDb.closeConnection();
});