const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  body: {
    type: String,
    required: [true, 'Body is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
