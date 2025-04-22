import { calculateAdjustedTime } from './calculateAdjustedTime';

describe('calculateAdjustedTime', () => {
    it('adjusts time correctly when SSS difference is zero', () => {
        expect(calculateAdjustedTime(30, 0, 1.4, 1.4)).toBe('30m 0s');
    });

    it('adjusts time correctly for easier course', () => {
        expect(calculateAdjustedTime(30, 0, 1.6, 1.4)).toBe('29m 54s');
    });

    it('adjusts time correctly for harder course', () => {
        expect(calculateAdjustedTime(30, 0, 1.4, 3.4)).toBe('31m 0s');
    });

    it('handles seconds correctly', () => {
        expect(calculateAdjustedTime(29, 30, 1.4, 1.5)).toBe('29m 33s');
    });
});