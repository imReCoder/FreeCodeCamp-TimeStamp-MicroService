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
app.get("/api/:date", function (req, res) {
  try {
    let unix, utc;
    const para = req.params.date;
    const someNum = Number(para);
    if (Number.isNaN(someNum)) {
      unix = new Date(para).getTime();
    } else {
      unix = someNum;
    }
    utc = new Date(unix).toUTCString();
    if (utc) {
      return res.json({ unix, utc });
    }
    res.json({ error: "Invalid Date" });

  } catch (e) {
    res.json({ error: "Invalid Date" });
  }
});


const PORT = 3500;
// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
