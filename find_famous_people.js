const pg = require("pg");
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'knex_user',
        password: 'knexFTW',
        database: 'test_db'
    }
});
console.log('Searching ...');
knex.select('first_name', 'last_name', 'birthdate').from('famous_people').asCallback(function (err, rows) {
    if (err) return console.error(err);
    console.log(`Found ${rows.length} person(s) by the name '':`);
    let personNumber = 1;
    for (let i in rows) {
        console.log(personNumber + ' ' + rows[i].first_name, rows[i].last_name, rows[i].birthdate.toISOString().slice(0, 10));
        personNumber++;
    }
    knex.destroy();
})
