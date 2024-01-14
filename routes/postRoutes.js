const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema');

// Create a new post
router.post('/', async (req, res) => {
  const { name, category, content } = req.body;
  if (typeof name !== 'string' || typeof category !== 'string' || typeof content !== 'string') {
    return res.status(400).send('Name, category and content must be strings');
 }


  const post = new Post(req.body);

  try {
    await post.save();
    res.redirect("/posts");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render('post', { post });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/add', (req, res) => {
    res.render('add-post');
});

// Retrieve a single post with a given id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a post with a given id
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});



// Delete a post with a given id
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).send();
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
