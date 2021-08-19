const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Post = require('../models/Post');

router.get('/', ensureAuth, async (req, res) => {
  try {
    const posts = await Post.find().populate('author').sort('-createdAt');
    res.render('index', { user: req.user, posts });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
