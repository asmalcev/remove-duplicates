let startValue = 0;

const key = 'rss';

const memory = () => {
    startValue = process.memoryUsage()[key];
};

const memoryEnd = () => {
    const diff =
        Math.round(
            ((process.memoryUsage()[key] - startValue) / 1024 / 1024) * 100
        ) / 100;
    console.log(
        `${process.isAutotest ? '"memory"' : `${key} diff`}: ${diff}${
            process.isAutotest ? ',' : ' MB'
        }`
    );
};

module.exports = { memory, memoryEnd };
