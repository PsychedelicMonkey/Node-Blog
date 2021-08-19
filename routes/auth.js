const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, email, password, password2 } = req.body;

  let errors = [];
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords must match' });
  }

  if (errors.length > 0) {
    res.render('register', { errors });
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
