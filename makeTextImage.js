const { createCanvas } = require('canvas');

const makeTextImage = (input) => {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    const text = ctx.measureText(input);

    ctx.font = '30px Impact';
    ctx.fillStyle = 'white';
    ctx.fillText(input, 30, 30, text.width + 50);
    ctx.fillStyle = 'black';
    ctx.strokeText(input, 30, 30, text.width + 50);

    return canvas.toBuffer();
};

module.exports.makeTextImage = makeTextImage;
