const conn = require('./conn');
const User = require('./User');

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ name: 'moe', password: 'MOE' }),
        User.create({ name: 'larry', password: 'LARRY' }),
        User.create({ name: 'curly', password: 'CURLY' }),
        User.create({ name: 'shep', password: 'CURLY' }),
        User.create({ name: 'steve', password: 'CURLY' })
      ]);
    });
};

module.exports = {
  models: {
    User
  },
  syncAndSeed
};
