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

const fName = process.argv[2];
const lName = process.argv[3];
const bDate = process.argv[4];

if (fName && lName && bDate) {
  console.log(`Inserting ${fName} ${lName} born on ${bDate} into famous_people ...`);

  knex('famous_people')
  .insert({
    first_name: fName,
    last_name: lName,
    birthdate: bDate
  })
  .then(res => {
    console.log("... Done")
    knex.destroy()
    .then()
    .catch(err => console.error(err));
  })
  .catch((err) => {
    console.error(err);
    knex.destroy()
    .then()
    .catch(err => console.error(err));
  });

} else {
  console.error("You must pass a first name, last name and a birthdate.")
}