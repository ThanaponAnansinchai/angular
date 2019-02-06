//Install express server

const express = require('express');
const app = express();

// Bypass a mixed content error

app.use(function (req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  });



// Serve only the static files form the dist directory
app.use(express.static('./dist/abc'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './src/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);