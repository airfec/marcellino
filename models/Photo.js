const { Pool, Client } = require('pg');

console.log('seeding db...');

const connectionString = 'postgres://localhost:5432/sdcphotos';

// CREATE TABLE photos (
//   key        BIGSERIAL PRIMARY KEY,
//   id         INTEGER,
//   name       VARCHAR (255),
//   url        VARCHAR (255),
//   verified   BOOLEAN,
//   desc       VARCHAR (255)
// );

const pool = new Pool({
  // user: 'nick',
  // // host: 'database.server.com',
  // database: 'sdcphotos',
  // password: 'qw3rty',
  // // port: 3211,
  connectionString,
});

const loadCSV = () => {
  const prefix = 'COPY photos FROM';
  const path = '/home/nick/projects/hackreactor/systemdesigncapstone/Photo-Carousel-Service/data/data1.csv';
  const suffix = 'WITH (FORMAT csv);';
  pool.query(`${prefix} ${path} ${suffix}`, (err, res) => {
    if (err) {
      console.log('Error copying file 01', err);
    }
    console.log('File 01 loaded successfully', res);
    pool.end();
  });
};

loadCSV();

pool.query("select * from photos where id ='1';", (err, res) => {
  // console.log(err, res)
  if (err) console.log(err);
  const test = res;
  console.log(test);
  pool.end();
});

// module.exports = Photo;
