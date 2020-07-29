var express = require('express');
var app = express();

const port = process.env.PORT || 8081;

const { makeTextImage } = require('./makeTextImage.js');
const {
    addTyposToString,
    defaultSettings,
} = require('./typos/addTyposToString.js');

app.get('/typos/:pathname', async function (req, res) {
    const { params } = req;
    const inputString = params && params.pathname;

    const settings = {
        ...defaultSettings,
        extraCharacters: 40,
        frequency: 25,
        missedCharacters: 25,
    };

    const inputWithTypos = addTyposToString({
        inputString,
        settings,
    });

    const image = await makeTextImage(inputWithTypos);

    res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': image.length,
    });
    res.end(image);
});

app.get('/images/:pathname', async function (req, res) {
    const { params } = req;
    const pathname = params && params.pathname;
    const image = await makeTextImage(pathname);
    //   res.set("Content-Type", "img/jpg");
    //   res.send(image);
    //var img = Buffer.from(image, "base64");

    res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': image.length,
    });
    res.end(image);
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

var server = app.listen(port, function () {
    var host = server.address().address;

    console.log('Example app listening at http://%s:%s', host, port);
});
