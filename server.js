//Install express server

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();



// Serve only the static files form the dist directory

app.use(express.static('./dist/abc'));
app.use(cors());
app.get('/*', function (req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.sendFile(path.join(__dirname, '/dist/abc/index.html'));

});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);