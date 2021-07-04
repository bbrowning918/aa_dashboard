import { ippReducer, transfer, increase, decrease } from './ippSlice';
import { Powers } from '../constants';


describe('ippSlice tests', () => {
    test('initialized state', () => {
        expect(ippReducer(undefined, {type: undefined})).toEqual({
            [Powers.GERMANY]: 20,
            [Powers.SOVIET_UNION]: 8,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        });
    });
    test('transfer', () => {
        const state = {
            [Powers.GERMANY]: 20,
            [Powers.SOVIET_UNION]: 8,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        };
        expect(ippReducer(state, transfer({from: Powers.GERMANY, to: Powers.SOVIET_UNION, amount: 10}))).toEqual({
            [Powers.GERMANY]: 10,
            [Powers.SOVIET_UNION]: 18,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        });
    });
    test('transfer where to/from are the same has no effect', () => {
        const state = {
            [Powers.GERMANY]: 20,
            [Powers.SOVIET_UNION]: 8,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        };
        expect(ippReducer(state, transfer({from: Powers.GERMANY, to: Powers.GERMANY, amount: 10}))).toEqual({
            [Powers.GERMANY]: 20,
            [Powers.SOVIET_UNION]: 8,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        });
    });
    test('increase', () => {
        const state = {
            [Powers.GERMANY]: 20,
            [Powers.SOVIET_UNION]: 8,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        };
        expect(ippReducer(state, increase({country: Powers.GERMANY, amount: 4}))).toEqual({
            [Powers.GERMANY]: 24,
            [Powers.SOVIET_UNION]: 8,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        });
    });
    test('decrease', () => {
        const state = {
            [Powers.GERMANY]: 20,
            [Powers.SOVIET_UNION]: 8,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        };
        expect(ippReducer(state, decrease({country: Powers.SOVIET_UNION, amount: 2}))).toEqual({
            [Powers.GERMANY]: 20,
            [Powers.SOVIET_UNION]: 6,
            [Powers.COMMUNIST_CHINA]: 2,
            [Powers.JAPAN]: 16,
            [Powers.UK_WEST]: 11,
            [Powers.UK_EAST]: 5,
            [Powers.ANZAC]: 3,
            [Powers.FRANCE]: 5,
            [Powers.ITALY]: 7,
            [Powers.USA]: 6,
            [Powers.NATIONALIST_CHINA]: 6,
        });
    });
});
