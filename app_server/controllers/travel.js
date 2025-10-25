var fs = require('fs');

// read JSON at module load 
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

exports.travel = (req, res) => {
  // teacher pattern: pass the list to the view
  res.render('travel', { title: 'Travlr Getaways', trips: list });
};




