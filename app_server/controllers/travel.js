const tripsEndpoint = 'http://localhost:3000/api/trips';
//will fetch data from the API instead of reading from file
const options = {
method: 'GET',
headers: {
'Accept': 'application/json'
}
}
//var fs = require('fs');

// read JSON at module load 
//var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travel = async (req, res, next) => {
    await fetch(tripsEndpoint, options).then((res) => res.json()).then((json) => {
        let message = null;
        if (!json instanceof Array) {
            message = "API lookup failed";
            json = [];
        }
        else {
          if (!json.length) {
            message = "No trips exist in our database";
          }
        }
        res.render('travel', { title: 'Travlr Getaways', trips: json, message });
      })
      .catch((err) => res.status(500).send(err.message));

};

module.exports = {
  travel
};






