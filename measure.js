const { time, timeEnd } = require('./time');

let testNumber = 1;

const measure = ({ correctAnswer, target }) => {
    console.log(process.isAutotest ? '{' : '\n');
    console.log(
        `${process.isAutotest ? '"TEST"' : 'TEST'}: ${testNumber++}${
            process.isAutotest ? ',' : ''
        }`
    );

    time();
    const answer = target();
    timeEnd();

    if (process.isAutotest) {
        console.log(`"correct": ${answer === correctAnswer},`);
        console.log(`"marker": "${target.name}"`);
    } else {
        if (answer === correctAnswer) {
            console.log('\x1b[32mCORRECT', answer);
        } else {
            console.log(
                '\x1b[31m WRONG',
                answer,
                'but correct is',
                correctAnswer
            );
        }
        console.log(`marker: ${target.name}`);
    }
    if (process.isAutotest) console.log('},');
};

module.exports = { measure };
