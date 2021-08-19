const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password, password2 } = req.body;

  let errors = [];
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords must match' });
  }

  try {
    let user = await User.findOne({ username }).exec();
    if (user) {
      errors.push({ msg: 'Please use a different username' });
    }

    user = await User.findOne({ email }).exec();
    if (user) {
      errors.push({ msg: 'Please use a different email address' });
    }

    if (errors.length > 0) {
      res.render('register', { errors, username, email });
    } else {
      user = new User({ username, email });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = hash;
      await user.save();

      res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err);
    errors.push({ msg: 'Database error' });
    res.render('register', { errors, username, email });
  }
});

module.exports = router;
