import { arr } from './data';
import { measure } from './measure';
import { memory, memoryEnd } from './memory';

process.isAutotest = process.argv[2] === '--autotest';
const tests = Number(process.argv[3]) || 1;

if (process.isAutotest) {
    console.log('[');
}

const arrIds = arr.map((el) => el.id + el.type);
const arrIdsSet = new Set(arrIds);

if (!process.isAutotest)
    console.log('duplicates', arrIds.length - arrIdsSet.size);

const filterByDeletingFromIdsSet = () => {
    if (!process.isAutotest) memory();

    const ids = new Set(arr.map((el) => el.id + el.type));
    const noDuplicates = arr.filter((el) => ids.delete(el.id + el.type));

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const toMapToValues = () => {
    if (!process.isAutotest) memory();

    const map = {};
    arr.forEach((el) => (map[el.id + el.type] = el));
    const noDuplicates = Object.values(map);

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const toMapToValues2 = () => {
    if (!process.isAutotest) memory();

    const map = {};
    arr.forEach((el) => !map[el.id + el.type] && (map[el.id + el.type] = el));
    const noDuplicates = Object.values(map);

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const toMapToValues3 = () => {
    if (!process.isAutotest) memory();

    const map = {};
    arr.forEach((el) => {
        const idtype = el.id + el.type;
        if (!map[idtype]) map[idtype] = el;
    });
    const noDuplicates = Object.values(map);

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const reduceWithIndexCheck = () => {
    if (!process.isAutotest) memory();

    const noDuplicates = arr.reduce(
        (acc, el) =>
            acc.findIndex((ell) => ell.id === el.id && ell.type === el.type) >
            -1
                ? acc
                : [...acc, el],
        []
    );

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const reduceWithIndexCheck2 = () => {
    if (!process.isAutotest) memory();

    const noDuplicates = arr.reduce(
        (acc, el) =>
            acc.findIndex((ell) => ell.id === el.id && ell.type === el.type) >
            -1
                ? acc
                : acc.concat(el),
        []
    );

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const filterWithSetOfIds = () => {
    if (!process.isAutotest) memory();

    const idtypes = new Set();
    const noDuplicates = arr.filter((el) => {
        if (!idtypes.has(el.id + el.type)) {
            idtypes.add(el.id + el.type);
            return true;
        }
        return false;
    });

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const filterWithMapOfIds = () => {
    if (!process.isAutotest) memory();

    const idtypes = {};
    const noDuplicates = arr.filter((el) => {
        if (!idtypes[el.id + el.type]) {
            idtypes[el.id + el.type] = true;
            return true;
        }
        return false;
    });

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const toStringToSetToArrayToObject = () => {
    if (!process.isAutotest) memory();

    const noDuplicates = Array.from(
        new Set(arr.map((el) => JSON.stringify(el)))
    ).map((el) => JSON.parse(el));

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

for (let i = 0; i < tests; i++) {
    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: filterByDeletingFromIdsSet,
    // });

    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: toMapToValues,
    // });

    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: toMapToValues2,
    // });

    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: toMapToValues3,
    // });

    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: reduceWithIndexCheck,
    // });

    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: reduceWithIndexCheck2,
    // });

    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: filterWithSetOfIds,
    // });

    // measure({
    //     correctAnswer: arrIdsSet.size,
    //     target: filterWithMapOfIds,
    // });

    measure({
        correctAnswer: arrIdsSet.size,
        target: toStringToSetToArrayToObject,
    });
}

if (process.isAutotest) console.log('null]');
