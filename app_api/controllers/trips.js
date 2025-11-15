// app_api/controllers/trip.js
const Trip = require('../models/travlr');

// GET /api/trips
const tripsList = async (req, res, next) => {
  try {
    const docs = await Trip.find({}).lean().exec();
    if (!docs || docs.length === 0) return res.status(404).json({ error: 'No trips found' });
    return res.status(200).json(docs);
  } catch (err) { return next(err); }
};

// GET /api/trips/:tripCode
const tripsFindByCode = async (req, res, next) => {
  try {
    const doc = await Trip.findOne({ code: req.params.tripCode }).lean().exec();
    if (!doc) return res.status(404).json({ error: 'Trip not found' });
    return res.status(200).json(doc);
  } catch (err) { return next(err); }
};

// POST /api/trips
const tripsAdd = async (req, res) => {
  try {
    const saved = await new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    }).save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Create failed' });
  }
};

// PUT /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  try {
    const updated = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ error: 'Trip not found' });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Update failed' });
  }
};

// DELETE /api/trips/:tripCode
const tripsDelete = async (req, res) => {
  try {
    const deleted = await Trip.findOneAndDelete({ code: req.params.tripCode }).lean();
    if (!deleted) return res.status(404).json({ error: 'Trip not found' });
    return res.status(200).json({ ok: true, deleted });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Delete failed' });
  }
};

module.exports = { tripsList, tripsFindByCode, tripsAdd, tripsUpdateTrip, tripsDelete };
