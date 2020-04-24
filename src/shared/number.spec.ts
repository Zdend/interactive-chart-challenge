import { range } from './number';

it.each([
    [4, 0, 5, 4],
    [10, 0, 5, 5],
    [-1, 0, 5, 0],
    [-1, 4, 5, 4],
])('coerces %s to be between %s - %s and returns %s', (value, min, max, output) => {
    expect(range(value, min, max)).toEqual(output)
})