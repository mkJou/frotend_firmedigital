import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Blog'
  }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema, 'comentarios-blog');

export default Comment;