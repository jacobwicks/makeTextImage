var express = require('express');
var app = express();
app.use(express.static(__dirname + '/images'));

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
    const instructions = `
    <h1>Welcome to Make Text Image</h1>
    It generates an image based on the text you put in. <br/><br/>


    Access images at /images/ <br/><br/>
    <img src="/images/exampleText.jpg"><br/><br/>
    <a href="https://make-text-image.herokuapp.com/images/Example Text">https://make-text-image.herokuapp.com/images/Example Text</a><br/><br/>

    You can have typos added to your text at /typos/<br/><br/>
    <img src="/images/typoText.jpg"><br/><br/>
    <a href="https://make-text-image.herokuapp.com/typos/Example Text">https://make-text-image.herokuapp.com/typos/Example Text</a><br/>
    `;
    res.end(instructions);
});

var server = app.listen(port, function () {
    var host = server.address().address;

    console.log('Example app listening at http://%s:%s', host, port);
});
