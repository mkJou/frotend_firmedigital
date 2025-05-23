import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
  blogArticleId: {
    type: String,
    required: false,
  },
  blogArticleUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
}, {
  collection: 'videos'
});

// Middleware para actualizar el campo updatedAt antes de cada actualización
videoSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
