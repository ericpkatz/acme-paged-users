const path = require('path');
const express = require('express');
const db = require('./db');
const { User } = db.models;


const app = express();

module.exports = app;

app.use(require('body-parser').json());


app.use('/dist', express.static(path.join(__dirname, '../dist')));

const index = path.join(__dirname, '../index.html');

app.get('/', (req, res)=> res.sendFile(index));

app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

app.get('/api/users/count', (req, res, next)=> {
  User.count()
    .then( count => res.send({ count }))
    .catch(next);
});

app.get('/api/users/page/:index?', (req, res, next)=> {
  let index = 0;
  const limit = 2;
  if(req.params.index){
    index = req.params.index*1;
  }
  const offset = index * limit;

  User.findAll({
    limit,
    offset
  })
    .then( users => res.send(users))
    .catch(next);
});

app.post('/api/users', (req, res, next)=> {
  User.create(req.body)
    .then( user => res.status(201).send(user))
    .catch(next);
});

app.post('/api/users/reset', (req, res, next)=> {
  db.syncAndSeed()
    .then(()=> res.sendStatus(204))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => user.update(req.body))
    .then( user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => user.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err.message });
});
