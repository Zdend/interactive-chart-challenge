export const getInitialBarValues = (barCount: number, initialValues: number[]): number[] => {
    return new Array(barCount)
        .fill(0)
        .map((item, index) => typeof initialValues[index] === 'number' ? initialValues[index] : item);
}