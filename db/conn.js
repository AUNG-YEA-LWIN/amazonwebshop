const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log('data base connected'))
  .catch((err) => console.log('error : ' + err.message));
