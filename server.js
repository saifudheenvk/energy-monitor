const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');

// const hostName = "stage.senergy.net"
const httpsPort = 8010;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const httpsOptions = {
    cert: fs.readFileSync('./src/senergy.net.crt'),
    key: fs.readFileSync('./src/senergy.net.key'),
}

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(httpsPort);