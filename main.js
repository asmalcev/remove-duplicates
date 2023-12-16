import { arr } from './data';
import { measure } from './measure';
import { memory, memoryEnd } from './memory';

process.isAutotest = process.argv[2] === '--autotest';
const tests = Number(process.argv[3]) || 1;

if (process.isAutotest) {
    console.log('[');
} else {
    console.log('------ BEGIN ------');
}

const arrIds = arr.map((el) => el.id + el.type);
const arrIdsSet = new Set(arrIds);

if (!process.isAutotest)
    console.log('duplicates', arrIds.length - arrIdsSet.size);

const removeDuplicates1 = (monitorMemory = false) => {
    if (monitorMemory) memory();

    const ids = new Set(arr.map((el) => el.id + el.type));
    const noDuplicates = arr.filter((el) => ids.delete(el.id + el.type));

    if (monitorMemory) memoryEnd();

    return noDuplicates.length;
};

const removeDuplicates2 = (monitorMemory = false) => {
    if (monitorMemory) memory();

    const map = {};
    arr.forEach((el) => (map[el.id + el.type] = el));

    if (monitorMemory) memoryEnd();

    return Object.values(map).length;
};

const removeDuplicates3 = (monitorMemory = false) => {
    if (monitorMemory) memory();

    const map = {};
    arr.forEach((el) => !map[el.id + el.type] && (map[el.id + el.type] = el));

    if (monitorMemory) memoryEnd();

    return Object.values(map).length;
};

const removeDuplicates4 = (monitorMemory = false) => {
    if (monitorMemory) memory();

    const map = {};
    arr.forEach((el) => {
        const idtype = el.id + el.type;
        if (!map[idtype]) map[idtype] = el;
    });

    if (monitorMemory) memoryEnd();

    return Object.values(map).length;
};

for (let i = 0; i < tests; i++) {
    measure({
        correctAnswer: arrIdsSet.size,
        target: removeDuplicates1,
        marker: 'removeDuplicates1',
        targetArgs: [true],
    });

    measure({
        correctAnswer: arrIdsSet.size,
        target: removeDuplicates2,
        marker: 'removeDuplicates2',
        targetArgs: [true],
    });

    measure({
        correctAnswer: arrIdsSet.size,
        target: removeDuplicates3,
        marker: 'removeDuplicates3',
        targetArgs: [true],
    });

    measure({
        correctAnswer: arrIdsSet.size,
        target: removeDuplicates4,
        marker: 'removeDuplicates4',
        targetArgs: [true],
    });
}

if (process.isAutotest) console.log('null]');
