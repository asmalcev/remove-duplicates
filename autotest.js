const { exec } = require('node:child_process');
const { promisify } = require('node:util');

const asyncExec = promisify(exec);

const TEST_COUNT = 20;

const data = JSON.parse(
    (await asyncExec(`bun main.js --autotest ${TEST_COUNT}`)).stdout
).filter(Boolean);

const groupBy = (xs, key) =>
    xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});

const sum = (arr) => arr.reduce((acc, el) => acc + el, 0);

console.log(
    Object.entries(groupBy(data, 'marker')).map((group) => ({
        marker: group[0],
        'avg time (ms)':
            Math.floor(
                (sum(group[1].map((el) => el.time)) / group[1].length) * 1000
            ) / 1000,
    }))
);
