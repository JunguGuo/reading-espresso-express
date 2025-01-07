const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please add a puzzle type'],
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      maxlength: [8000, 'Content cannot be longer than 6000 characters'],
      minlength: [10, 'Content cannot be shorter than 10 characters'],
    },
    img: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      max: [2024, 'Year cannot be greater than 2024'],
    },
    yearStr: {
      type: String,
      trim: true,
    },
    intro: {
      type: String,
      trim: true,
    },
    curator: {
      type: String,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
