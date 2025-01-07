const Puzzle = require('../models/puzzleModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllPuzzles = async (req, res) => {
  try {
    //EXCLUDE QUERY
    const features = new APIFeatures(Puzzle.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const puzzles = await features.query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: puzzles.length,
      data: {
        puzzles,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getPuzzle = async (req, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id); // only populate tapes when accessed by ID!
    res.status(200).json({
      status: 'success',
      data: {
        puzzle,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createPuzzle = async (req, res) => {
  try {
    const newPuzzle = await Puzzle.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        puzzle: newPuzzle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updatePuzzle = async (req, res) => {
  try {
    const puzzle = await Puzzle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        puzzle,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deletePuzzle = async (req, res) => {
  try {
    await Puzzle.findByIdAndDelete(req.params.id);
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
