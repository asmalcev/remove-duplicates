let startValue = 0;

export const time = () => {
    startValue = performance.now();
};

export const timeEnd = () => {
    const diff =
        Math.floor((startValue = performance.now() - startValue) * 100) / 100;
    console.log(
        `${process.isAutotest ? '"time"' : 'time'}: ${diff}${
            process.isAutotest ? ',' : ' ms'
        }`
    );
};
