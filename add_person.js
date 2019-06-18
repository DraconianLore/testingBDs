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
const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];


knex('famous_people').insert({
    first_name: firstName,
    last_name: lastName,
    birthdate: dob
}).asCallback(function (err) {
    if (err) return console.error(err);
    console.log(`${firstName} ${lastName} added to database`);

    knex.destroy();
})
