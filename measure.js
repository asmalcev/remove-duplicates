import { time, timeEnd } from './time';

let testNumber = 1;

export const measure = ({
    correctAnswer,
    target,
    marker = 'target',
    targetArgs = [],
}) => {
    console.log(process.isAutotest ? '{' : '\n');
    console.log(
        `${process.isAutotest ? '"TEST"' : 'TEST'}: ${testNumber++}${
            process.isAutotest ? ',' : ''
        }`
    );

    time();
    const answer = target(...targetArgs);
    timeEnd();

    if (process.isAutotest) {
        console.log(`"correct": ${answer === correctAnswer},`);
        console.log(`"marker": "${marker}"`);
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
        console.log(`marker: ${marker}`);
    }
    if (process.isAutotest) console.log('},');
};
