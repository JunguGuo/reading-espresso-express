const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    libID: {
      type: String,
      required: true,
      unique: true,
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

//remember virtual properties can't be accessed in a query
// userSchema.virtual('tapesCount').get(function () {
//   return this.tapes.length;
// });

userSchema.pre(/^find/, function (next) {
  //console.log('PRE FIND');

  this.start = Date.now();
  next();
});

userSchema.post(/^find/, function (docs, next) {
  console.log('POST FIND');
  console.log(`Query took: ${Date.now() - this.start}ms`);
  next();
});

userSchema.virtual('tapes', {
  ref: 'Tape',
  foreignField: 'user',
  localField: '_id',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
