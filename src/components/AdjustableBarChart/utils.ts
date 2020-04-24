import { range } from '../../shared/number';

export const getInitialBarValues = (barCount: number, initialValues: number[], maxY: number): number[] => {
    return new Array(barCount)
        .fill(0)
        .map((item, index) => {
            const value = typeof initialValues[index] === 'number' ? initialValues[index] : index;
            return range(value, 0, maxY);
        });
}