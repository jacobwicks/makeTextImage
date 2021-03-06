//returns a random integer
//if no min and max, 1-100
const getRandomInt = (min = 1, max = 100) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    max < min && (max = min + 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.getRandomInt = getRandomInt;
