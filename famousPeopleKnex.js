const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
});

console.log("Searching ...");

knex('famous_people')
.where('first_name', 'ilike', '%' + process.argv[2] + '%')
.orWhere('last_name', 'ilike', '%' + process.argv[2] + '%')
.then((res, err) => {
  console.log(`Found ${res.length} person(s) by the name ${process.argv[2]}:`)
  for (row in res) {
    const birthdate = `${res[row].birthdate.getFullYear()}-${res[row].birthdate.getMonth() + 1}-${res[row].birthdate.getDate()}`;
    console.log(`${Number(row) + 1}: ${res[row].first_name} ${res[row].last_name}, born '${birthdate}'`)
  }
});

knex.destroy()
  .then(res => console.log("... Done"))
  .catch(err => console.error(err));
