import { getBarValues } from './utils';

describe('getBarValues', () => {
    it.each([
        [[1, 20], 10, [1, 10]],
        [[-10, 20], 10, [0, 10]],
        [[null, 20], 10, [0, 10]],
    ])('normalizes %s to be within range 0 to %s range = %s', (value, maxY, result) => {
        expect(getBarValues(value, maxY)).toEqual(result);
    });
});