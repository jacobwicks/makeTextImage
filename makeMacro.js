const { createCanvas, loadImage } = require('canvas');

const makeMacro = async ({ url, input }) => {
    if (!url) return undefined;

    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    ctx.font = '60px Impact';
    ctx.fontWeight = '300';
    const text = ctx.measureText(input);
    const textWidth = text.width;

    const image = await loadImage(url);

    canvas.width = image.width;
    canvas.height = image.height;

    const center = Math.floor((canvas.width - textWidth) / 2) | 5;
    const bottom = canvas.height - 30;

    ctx.font = '60px Impact';
    ctx.fontWeight = '300';
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = 'white';
    ctx.fillText(input, center, bottom);
    ctx.fillStyle = 'black';
    ctx.strokeText(input, center, bottom);

    return canvas.toBuffer();
};

module.exports.makeMacro = makeMacro;
