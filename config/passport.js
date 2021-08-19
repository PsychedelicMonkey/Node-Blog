const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username or password',
          });
        }

        const success = await bcrypt.compare(password, user.password);
        if (!success) {
          return done(null, false, {
            message: 'Incorrect username or password',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
