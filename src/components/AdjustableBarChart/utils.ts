import { range } from '../../shared/number';

export const getBarValues = (value: number[], maxY: number): number[] => {
    return value.map((item, index) => {
        const value = typeof item === 'number' ? item : index;
        return range(value, 0, maxY);
    });
}