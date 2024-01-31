const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const jwtSecret = process.env.JWT_SECRET;
const adminLayout = '../views/layouts/admin';
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
      description: 'Simple Blog.',
    };
    res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
  }
});
router.get('/admin/dashboard', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Admin-Dashboard',
      description: 'Simple Blog',
    };
    const data = await Post.find();
    res.render('admin/dashboard', {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/admin/add-post', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add_Post',
      description: 'Simple Blog',
    };
    const data = await Post.find();
    res.render('admin/add-post', {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post('/admin/add-post', authMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      userId: req.userId,
    });

    await Post.create(newPost);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
  }
});
router.get('/admin/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'Free NodeJs User Management System',
    };

    const data = await Post.findOne({ _id: req.params.id });

    res.render('admin/edit-post', {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});
router.put('/admin/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/admin/edit-post/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});
router.post('/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User Created', user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: 'User already in use' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.log(error);
  }
});
router.delete('/admin/delete-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
  }
});
router.get('/admin/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});
module.exports = router;
