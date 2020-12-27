const calc = require('../calc');
const sum = calc.sum;
const minus = calc.minus;
const multiply = calc.multiply;
const split = calc.split;

describe ('Fuction sum()', () => {
    it('return 8 with arguments (2, 6)', () => {
        expect(sum(2, 6)).toBe(8);
    })
    it('return 2 with arguments (2, 0)', () => {
        expect(sum(2, 0)).toBe(2);
    })
    it('return 6 with arguments (0, 6)', () => {
        expect(sum(0, 6)).toBe(6);
    })
    it('return Error with arguments (null, 5)', () => {
        expect(sum(null, 5)).toEqual('Error');
    })
    it('return Error with arguments (3, null)', () => {
        expect(sum(3, null)).toEqual('Error');
    })
    it('return Error with arguments ("f", 3)', () => {
        expect(sum('f', 3)).toEqual('Error');
    })
    it('return Error with arguments (8, "7")', () => {
        expect(sum(8, '7')).toEqual('Error');
    })
    it('return Error with arguments (c, 3)', () => {
        let c
        expect(sum(c,3)).toEqual('Error');
    })
});

describe ('Fuction minus()', () => {
    it('return 4 with arguments (6, 2)', () => {
        expect(minus(6, 2)).toBe(4);
    })
    it('return -4 with arguments (2, 6)', () => {
        expect(minus(2, 6)).toBe(-4);
    })
    it('return -9 with arguments (0, 9)', () => {
        expect(minus(0, 9)).toBe(-9);
    })
    it('return 3 with arguments (3, 0)', () => {
        expect(minus(3, 0)).toBe(3);
    })
    it('return Error with arguments (null, 5)', () => {
        expect(minus(null, 5)).toEqual('Error');
    })
    it('return Error with arguments (3, null)', () => {
        expect(minus(3, null)).toEqual('Error');
    })
    it('return Error with arguments ("f", 3)', () => {
        expect(minus('f', 3)).toEqual('Error');
    })
    it('return Error with arguments (8, "7")', () => {
        expect(minus(8, '7')).toEqual('Error');
    })
    it('return Error with arguments (c, 3)', () => {
        let c
        expect(minus(c,3)).toEqual('Error');
    })
});

describe ('Fuction multiply()', () => {
    it('return 12 with arguments (6, 2)', () => {
        expect(multiply(6, 2)).toBe(12);
    })
    it('return 0 with arguments (0, 9)', () => {
        expect(multiply(0, 9)).toBe(0);
    })
    it('return 0 with arguments (3, 0)', () => {
        expect(multiply(3, 0)).toBe(0);
    })
    it('return Error with arguments (null, 5)', () => {
        expect(multiply(null, 5)).toEqual('Error');
    })
    it('return Error with arguments (3, null)', () => {
        expect(multiply(3, null)).toEqual('Error');
    })
    it('return Error with arguments ("f", 3)', () => {
        expect(multiply('f', 3)).toEqual('Error');
    })
    it('return Error with arguments (8, "7")', () => {
        expect(multiply(8, '7')).toEqual('Error');
    })
    it('return Error with arguments (c, 3)', () => {
        let c
        expect(multiply(c,3)).toEqual('Error');
    })
});

describe ('Fuction split()', () => {
    it('return 3 with arguments (6, 2)', () => {
        expect(split(6, 2)).toBe(3);
    })
    it('return 0.5 with arguments (3, 6)', () => {
        expect(split(3, 6)).toBe(0.5);
    })
    it('return Error with arguments (2, 0)', () => {
        expect(split(2, 0)).toEqual('Error');
    })
    it('return 0 with arguments (0, 6)', () => {
        expect(split(0, 6)).toBe(0);
    })
    it('return Error with arguments (null, 5)', () => {
        expect(split(null, 5)).toEqual('Error');
    })
    it('return Error with arguments (3, null)', () => {
        expect(split(3, null)).toEqual('Error');
    })
    it('return Error with arguments ("f", 3)', () => {
        expect(split('f', 3)).toEqual('Error');
    })
    it('return Error with arguments (8, "7")', () => {
        expect(split(8, '7')).toEqual('Error');
    })
    it('return Error with arguments (c, 3)', () => {
        let c
        expect(split(c,3)).toEqual('Error');
    })
});