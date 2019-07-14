const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 443;

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/nerd', function(req, res) {
    res.send('Aaron');
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

https.createServer({
    key: fs.readFileSync('./certs/localhost-key.pem'),
    cert: fs.readFileSync('./certs/localhost.pem')
  }, app).listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});