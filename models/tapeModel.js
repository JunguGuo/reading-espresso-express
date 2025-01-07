const mongoose = require('mongoose');

const tapeSchema = new mongoose.Schema(
  {
    read: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Read',
      required: [true, 'A tape must include a read.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    puzzles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Puzzle',
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

tapeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'libID',
  })
    .populate({
      path: 'read',
      select: '-__v -createdAt',
    })
    .populate({
      path: 'puzzles',
      select: '-__v -createdAt',
    });

  next();
});

const Tape = mongoose.model('Tape', tapeSchema);

module.exports = Tape;
