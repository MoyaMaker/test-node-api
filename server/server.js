require('./config/config.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/usuario', function (req, res) {
  res.json('Get usuario');
});

app.post('/usuario', function (req, res) {
  
  const body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      message: "Nombre es requerido"
    });
  } else {
    res.json({ body });
  }
});

app.put('/usuario/:id', function (req, res) {

  const id = req.params.id;

  res.json({
    id
  });
});
 
app.listen(process.env.PORT, () => {
  console.log(`Listening ${process.env.PORT} port`);
});
