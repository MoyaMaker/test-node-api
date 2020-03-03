require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use( require('./routes/user') );

// Mongoose connection - start
mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, (err, res) => {
  if (err) console.log(`Connection error: ${err}`);

  console.log('Connection success');
});
// Mongoose connection - end

app.listen(process.env.PORT, () => {
  console.log(`Listening ${process.env.PORT} port`);
});