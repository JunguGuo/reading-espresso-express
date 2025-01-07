const Read = require('../models/readModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllReads = async (req, res) => {
  try {
    //EXCLUDE QUERY
    console.log(req.query);
    const features = new APIFeatures(Read.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const reads = await features.query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: reads.length,
      data: {
        reads,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getRead = async (req, res) => {
  try {
    const read = await Read.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        read,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  //   const read = reads.find((read) => read._id === id);

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       read,
  //     },
  //   });
};

exports.createRead = async (req, res) => {
  try {
    const newRead = await Read.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        read: newRead,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  //   const newId = reads.length + 1;
  //   const newRead = Object.assign({ _id: newId }, req.body);
  //   console.log(`Creating new Read: ...${newRead._id}`);

  //   reads.push(newRead);

  //   fs.writeFile(
  //     `${__dirname}/../dev-data/data/reads.json`,
  //     JSON.stringify(reads),
  //     (error) => {
  //       res.status(201).json({
  //         status: 'success',
  //         data: {
  //           read: newRead,
  //         },
  //       });
  //     }
  //   );
};
exports.updateRead = async (req, res) => {
  try {
    const read = await Read.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        read,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteRead = async (req, res) => {
  try {
    await Read.findByIdAndDelete(req.params.id);
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
