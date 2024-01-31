const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const SearchHistory = require('../models/SearchHistory');
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "Blog",
      description: "Simple Blog."
    }
    let perPage = 10;
    let page = req.query.page || 1;
    const data = await Blog.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Blog.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    res.render('index', {locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });
  } catch (error) {
    console.log(error);
  }
});
router.get('/post/:id', async (req, res) => {
  try {
    let blogId = req.params.id;

    const data = await Blog.findById({ _id: blogId });

    const locals = {
      title: data.title,
      description: "Simple Blog",
    }

    res.render('post', {locals,
      data,
      currentRoute: `/post/${blogId}`
    });
  } catch (error) {
    console.log(error);
  }
});
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Blog"
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^A-Z0-9a-z ]/g, "")

    const data = await Blog.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
      ]
    });
    await SearchHistory.create({
      searchTerm,
      timestamp: new Date()
    });

    res.render("search", {data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }
});
router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  });
});

module.exports = router;
