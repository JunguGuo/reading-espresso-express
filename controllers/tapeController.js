const Tape = require('../models/tapeModel');
const Read = require('../models/readModel');
const Puzzle = require('../models/puzzleModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllTapes = async (req, res) => {
  try {
    //EXCLUDE QUERY
    const features = new APIFeatures(Tape.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const Tapes = await features.query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: Tapes.length,
      data: {
        Tapes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getTape = async (req, res) => {
  try {
    const tape = await Tape.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tape,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTape = async (req, res) => {
  try {
    const newTape = await Tape.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        Tape: newTape,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.constructTape = catchAsync(async (req, res) => {
  // Construct a Tape based on the request body submitted from the client
  // 1 FIND A READ BY TOPICS
  // req.query:   { year: { lte: '1600' } }
  //const randomRead;
  //const chess;

  const selectedTopics = req.body.selectedTopics;
  //console.log(req.body);
  // finds all documents in the Read collection where at least one of the topics or genres matches an item in the selectedTopics array
  const queryRead = {
    $or: [
      { topics: { $in: selectedTopics } },
      { genre: { $in: selectedTopics } },
    ],
    // topics: { $in: ['gala'] }, // ONLY FOR GALA
  };
  // Not used yet!
  const combinedQueryRead = {
    $and: [
      {
        $or: [
          { topics: { $in: selectedTopics } },
          { genre: { $in: selectedTopics } },
        ],
      },
      { year: { $lte: 1600 } },
    ],
  };

  const featuresRead = new APIFeatures(Read.find(), queryRead)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reads = await featuresRead.query;

  // Query Puzzle
  // let _puzzles = null;
  // console.log(req.body.selectedPuzzles);
  // const selectedPuzzles = req.body.selectedPuzzles;
  // const queryPuzzle = {
  //   type: { $in: selectedPuzzles },
  // };
  // const featuresPuzzle = new APIFeatures(Puzzle.find(), queryPuzzle)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  // const puzzles = await featuresPuzzle.query;
  // const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  // if (randomPuzzle) console.log(randomPuzzle._id);

  // const selectedPuzzles = req.body.selectedPuzzles;
  // const _puzzles = []; // Array to store a random puzzle from each matched type

  const selectedPuzzles = req.body.selectedPuzzles;
  const _puzzles = []; // Array to store a random puzzle from each matched type

  // Wrap the asynchronous logic inside an async function
  async function findAndSelectRandomPuzzles() {
    const puzzlesPromises = selectedPuzzles.map(async (type) => {
      // Query to find puzzles of the current type
      const queryPuzzle = {
        type: type,
      };
      const featuresPuzzle = new APIFeatures(Puzzle.find(), queryPuzzle)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const puzzles = await featuresPuzzle.query;

      if (puzzles.length > 0) {
        // Randomly select a puzzle from the matched puzzles
        const randomIndex = Math.floor(Math.random() * puzzles.length);
        const randomPuzzle = puzzles[randomIndex];
        return randomPuzzle; // Return the selected puzzle
      }
      return null; // Return null if no puzzles were found
    });

    // Wait for all promises to resolve and filter out any nulls
    const resolvedPuzzles = (await Promise.all(puzzlesPromises)).filter(
      (puzzle) => puzzle !== null,
    );
    _puzzles.push(...resolvedPuzzles); // Add all found puzzles to the _puzzles array

    console.log(_puzzles.map((puzzle) => puzzle._id)); // Optionally, log or process the _puzzles array
  }

  // Remember to call the function
  await findAndSelectRandomPuzzles().catch(console.error);

  if (reads.length > 0) {
    // Pick a reandom read from the reads array
    const randomRead = reads[Math.floor(Math.random() * reads.length)];
    // Create a new Tape based on the random read
    const tape = await Tape.create({
      read: randomRead._id,
      user: req.body.user,
      puzzles: _puzzles.map((puzzle) => puzzle._id),
    });

    //const newTape = await Tape.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tape,
      },
    });
  } else {
    //const newTape = await Tape.create(req.body);
    res.status(404).json({
      status: 'fail',
      message: 'no qualified reads found',
    });
  }
});

exports.updateTape = async (req, res) => {
  try {
    const tape = await Tape.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tape,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTape = async (req, res) => {
  try {
    await Tape.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
