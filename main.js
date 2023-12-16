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

const reduceWithSetOfIds = () => {
    if (!process.isAutotest) memory();

    const idtypes = new Set();
    const noDuplicates = arr.reduce((acc, el) => {
        if (idtypes.has(el.id + el.type)) return acc;
        idtypes.add(el.id + el.type);
        return acc.concat(el);
    }, []);

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const pushesUniqueInArrayWithIdsSet = () => {
    if (!process.isAutotest) memory();

    const idtypes = new Set();
    const noDuplicates = [];
    arr.forEach((el) => {
        if (!idtypes.has(el.id + el.type)) {
            idtypes.add(el.id + el.type);
            noDuplicates.push(el);
        }
    });

    if (!process.isAutotest) memoryEnd();

    return noDuplicates.length;
};

const collectUniqueInSetWithIdsSet = () => {
    if (!process.isAutotest) memory();

    const idtypes = new Set();
    const noDuplicates = new Set();
    arr.forEach((el) => {
        if (!idtypes.has(el.id + el.type)) {
            idtypes.add(el.id + el.type);
            noDuplicates.add(el);
        }
    });

    if (!process.isAutotest) memoryEnd();

    return Array.from(noDuplicates).length;
};

const forOfWithIdsMap = () => {
    if (!process.isAutotest) memory();

    const idtypes = {};
    const out = [];
    let j = 0;
    for (const el of arr) {
        const idtype = el.id + el.type;
        if (idtypes[idtype] !== 1) {
            idtypes[idtype] = 1;
            out[j++] = el;
        }
    }

    if (!process.isAutotest) memoryEnd();

    return out.length;
};

const forOfWithIdsSet = () => {
    if (!process.isAutotest) memory();

    const idtypes = new Set();
    const out = [];
    let j = 0;
    for (const el of arr) {
        const idtype = el.id + el.type;
        if (!idtypes.has(idtype)) {
            idtypes.add(idtype);
            out[j++] = el;
        }
    }

    if (!process.isAutotest) memoryEnd();

    return out.length;
};

const algos = [
    // filterByDeletingFromIdsSet,
    // toMapToValues,
    // toMapToValues2,
    // toMapToValues3,
    // reduceWithIndexCheck,
    // reduceWithIndexCheck2,
    // filterWithSetOfIds,
    // filterWithMapOfIds,
    // toStringToSetToArrayToObject,
    // reduceWithSetOfIds,
    // pushesUniqueInArrayWithIdsSet,
    // collectUniqueInSetWithIdsSet,
    // forOfWithIdsMap,
    // forOfWithIdsSet,
];

for (let i = 0; i < tests; i++) {
    algos.forEach((target) =>
        measure({
            correctAnswer: arrIdsSet.size,
            target,
        })
    );
}

if (process.isAutotest) console.log('null]');
