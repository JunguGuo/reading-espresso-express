const mongoose = require('mongoose');

const readSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [8000, 'Content cannot be longer than 6000 characters'],
      minlength: [10, 'Content cannot be shorter than 10 characters'],
    },
    topics: [String],
    genre: [String],
    age: {
      type: Number,
      max: [65, 'Age cannot be greater than 65'],
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
    region: {
      type: String,
      trim: true,
    },
    img: {
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

//DOCUMENT MIDDLEWARE: the save middleware only runs before .save() and .create(), but not .insertMany, .findOne, and .update, or findbyidandupdate
// readSchema.pre('save', function (next) {
//   //console.log(this);
//   console.log('PRE SAVE');
//   next();
// });

// readSchema.post('save', function (doc, next) {
//   //console.log(doc);
//   console.log('POST SAVE');
//   next();
// });

//QUERY MIDDLEWARE
readSchema.pre(/^find/, function (next) {
  //console.log('PRE FIND');

  this.start = Date.now();
  next();
});

readSchema.post(/^find/, function (docs, next) {
  console.log('POST FIND');
  console.log(`Query took: ${Date.now() - this.start}ms`);
  next();
});

const Read = mongoose.model('Read', readSchema);

module.exports = Read;
