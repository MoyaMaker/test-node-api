const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const User = require('../models/user');

const app = express();

app.get('/usuario', function(req, res) {

  const from = Number(req.query.from) || 0;
  const perPage = Number(req.query.perPage) || 5;

  const findConditions = { status: true };

  User.find(findConditions, 'name email role status google img')
  .skip(from)
  .limit(perPage)
  .exec((err, users) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: err
      });
    }

    User.count(findConditions, (error, count) => {
      res.json({
        ok: true,
        count,
        users
      });
    });

  });
});

app.post('/usuario', function(req, res) {
  
  const body = req.body;

  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10), // encrypt the password
    role: body.role
  });

  user.save((err, usr) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: err
      });
    }

    res.json({
      ok: true,
      user: usr
    });
  });
});

app.put('/usuario/:id', function(req, res) {

  const id = req.params.id;

  // .pick filter the properties than we provide and select
  const body = _.pick(req.body, [
    'name',
    'email',
    'img',
    'role',
    'status'
  ]);

  // 'runValidators' apply model validations
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usr) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: err
      });
    }

    res.json({
      ok: true,
      user: usr
    });
  });
});

app.delete('/usuario/:id', function(req, res) {
  const id = req.params.id;

  // .pick filter the properties than we provide and select
  const body = {
    status: false
  };

  User.findByIdAndUpdate(id, body, { new: true }, (err, deleted) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: err
      });
    }

    // if (deleted.status == false) {
    //   return res.status(400).json({
    //     ok: false,
    //     message: "Usuario no existe"
    //   });
    // }

    res.json({
      ok: true,
      user: deleted
    })
  });
});

module.exports = app;