/**
 * Returns value within the specified range
 */
export const range = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
} 