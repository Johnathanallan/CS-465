// app_server/models/seed.js
const mongoose = require('./db');         // connects
const Trip = require('./travlr');         // Mongoose model
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    // Wait until connected
    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve, reject) => {
        mongoose.connection.once('open', resolve);
        mongoose.connection.once('error', reject);
      });
    }

    // 1) Read JSON via absolute path
    const jsonPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
    const raw = fs.readFileSync(jsonPath, 'utf8');
    let data = JSON.parse(raw);

    // 2) Normalize shape to an array of trip objects
    //    Handles: { "1": {...}, "2": {...} } OR { "trips": [ ... ] } OR [ ... ]
    let trips = Array.isArray(data) ? data
              : Array.isArray(data.trips) ? data.trips
              : Object.values(data);

    // 3) Map to the exact schema keys and types your model expects
    trips = trips.map(t => ({
      code: t.code,
      name: t.name,
      length: t.length,
      start: t.start ? new Date(t.start) : undefined,
      resort: t.resort,
      perPerson: t.perPerson !== undefined ? Number(t.perPerson) : undefined,
      image: t.image?.startsWith('/images/') ? t.image : `/images/${t.image}`,
      description: t.description
    }));

    // 4) Sanity log so you can see what’s going in
    console.log('Seed preview:', { count: trips.length, first: trips[0] });

    // 5) Validate before insert (optional but helpful)
    trips.forEach((doc, i) => {
      ['code','name','length','start','resort','perPerson','image','description'].forEach(k => {
        if (doc[k] === undefined) throw new Error(`Trip[${i}] missing required field: ${k}`);
      });
    });

    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log(`Seed complete: inserted ${trips.length} trips`);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();
