const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Post = require('../models/Post');

router.get('/add', ensureAuth, (req, res) => {
  res.render('add');
});

router.post('/', ensureAuth, async (req, res) => {
  const { title, body } = req.body;

  try {
    await Post.create({ title, body, author: req.user });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/posts/add');
  }
});

module.exports = router;
