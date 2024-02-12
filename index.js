// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  try {
    let date = req.params.date;

    //default return values with current date
    let unix = Math.round(new Date().getTime());
    let utc = new Date().toUTCString();

    //if date param is defined we clear it, check if it's a date and then format the output
    if (date !== undefined) {
      date = date.replace(" ", "");
      let isTimestamp = /^\d+$/.test(date);
      let tmpDate = isTimestamp ? parseInt(date) : date;
      let dateCheck = (new Date(tmpDate) !== "Invalid Date") && !isNaN(new Date(tmpDate));
      if (!dateCheck) {
        throw { error: "Invalid Date" }
      }

      unix = isTimestamp ? parseInt(date) : Math.round(new Date(date).getTime());
      utc = new Date(isTimestamp ? parseInt(date) : date).toUTCString();
    }

    return res.status(200).json({
      unix: unix,
      utc: utc
    });
  }
  catch (err) {
    //console.log(err)
    return res.status(500).json(err)
  }
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
