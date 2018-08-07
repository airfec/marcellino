const mongoose = require('mongoose');
const faker = require('faker');
const path = require('path');

const db = require('./models/');

const IMG_URL = 'https://s3-us-west-1.amazonaws.com/airfec2018/photos/file-';

const MAX_ID_RANGE = 100;
const MAX_IMG_RANGE = 10;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// drop collection if exists
console.log('cleared db for re-seed...\n');
db.Photo.remove({}).exec((err, results) => {
  if (err) {
    console.error(err);
    return process.exit(0);
  }

  console.log('db cleared!\n');
  console.log('starting re-seeding....\n');

  const inProgressDataBaseEntries = [];

  for (let id = 1; id <= MAX_ID_RANGE; id += 1) {
    for (let images = 1; images <= MAX_IMG_RANGE; images += 1) {
      const photo = new db.Photo({
        room_id: id,
        photo_url: `${IMG_URL + getRandomIntInclusive(1, 75)}.jpg`,
        verified: !Math.floor(Math.random() * 2),
        description: faker.lorem.sentence(),
      });

      inProgressDataBaseEntries.push(
        photo.save().then((item) => {
          Promise.resolve(item);
        }), // trailing comma breaking
      );
    }
  }

  Promise.all(inProgressDataBaseEntries)
    .then((dbResults) => {
      console.log(`${dbResults.length} entries saved in DataBase`);
    })
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });
});
