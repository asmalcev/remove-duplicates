import * as seedrandom from './seedrandom';
seedrandom;

const seed = 745627567231241;
// @ts-ignore
Math.seedrandom(seed);

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * max + min);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getRandomStr = (length) =>
    Array.from({ length }, (_) => chars[getRandomInt(chars.length)]).join('');

const types = Array.from({ length: 30 }, () =>
    getRandomStr(getRandomInt(15, 5))
);

const getRandomIdType = () => ({
    id: getRandomInt(10000),
    type: types[getRandomInt(types.length)],
});

export const arr = Object.freeze(Array.from({ length: 50000 }, getRandomIdType));
