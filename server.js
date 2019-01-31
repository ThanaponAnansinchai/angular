//Install express server

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
// Serve only the static files form the dist directory

app.use(function (req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  });

app.use(express.static('./dist/abc'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);