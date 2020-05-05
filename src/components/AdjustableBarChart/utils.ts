import { range } from '../../shared/number';

export const getBarValues = (values: number[], maxY: number): number[] => {
    return values.map((item) => range(item, 0, maxY));
}