const Tape = require('../models/tapeModel');
const catchAsync = require('../utils/catchAsync');

function getCurrentDay() {
  const Time = {}; // Initialize Time object

  // Arrays for months and days
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // Current date and time
  const today = new Date();

  // Format date
  const day = String(today.getDate()).padStart(2, '0');
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  Time.date = `${months[monthIndex]} ${day},${year}`;

  // Format time
  const dayOfWeek = days[today.getDay()];
  let hours = today.getHours();
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert 24h to 12h format and handle '0' case
  Time.time = `${dayOfWeek} ${hours}:${minutes} ${ampm}`;

  return Time;
}

exports.getTape = catchAsync(async (req, res, next) => {
  const tape = await Tape.findById(req.params.id);

  //console.log(tape);
  res.status(200).render('tape', {
    day: getCurrentDay().date,
    time: getCurrentDay().time,
    content: tape.read.content,
    title: tape.read.title,
    intro: tape.read.intro,
    comment: tape.read.comment,
    author: tape.read.author,
    curator: tape.read.curator,
    topics: tape.read.topics,
    genre: tape.read.genre,
    yearStr: tape.read.yearStr,
    puzzles: tape.puzzles,
    id: tape._id,
    readImg: tape.read.img,
  });
});
