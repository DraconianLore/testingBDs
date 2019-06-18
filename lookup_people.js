
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

let args = process.argv.slice(2);

console.log('Searching ...');
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT * FROM famous_people WHERE last_name LIKE $1 OR first_name LIKE $1', [args[0]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const queryData = result.rows;
    console.log(`Found ${result.rowCount} person(s) by the name '${args}':`);
    let rowCount = 1;
    for (let i in result.rows) {
        const dob = result.rows[i].birthdate.toISOString();
        console.log('-',rowCount + ':', result.rows[i].first_name, result.rows[i].last_name + ", born '" + dob.slice(0,10)+"'");
        rowCount++;
    }
    client.end();
  });
});