const Trip = require('../models/travlr');

// GET /api/trips
const tripsList = async (req, res, next) => {
  try {
    const docs = await Trip.find({}).lean().exec();
    if (!docs || docs.length === 0) {
      return res.status(404).json({ error: 'No trips found' });
    }
    return res.status(200).json(docs);
  } catch (err) {
    return next(err);
  }
};

// GET /api/trips/:tripCode
const tripsFindByCode = async (req, res, next) => {
  try {
    const { tripCode } = req.params;
    const doc = await Trip.findOne({ code: tripCode }).lean().exec();
    if (!doc) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    return res.status(200).json(doc);
  } catch (err) {
    return next(err);
  }
};

module.exports = { tripsList, tripsFindByCode };
