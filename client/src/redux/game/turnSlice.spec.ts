import { turnReducer, nextTurn, nextPower, prevPower, saveCurrent } from './turnSlice';
import { Powers } from '../constants';

describe('turnSlice tests', () => {
    test('initialized state', () => {
        expect(turnReducer(undefined, {type: undefined})).toEqual({
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.GERMANY
        });
    });
    test('nextTurn updates if all powers have saved', () => {
        const state = {
            [Powers.GERMANY]: {0: {start: 20, spent: 20, income: 20}, 1: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8, spent: 8, income: 8}, 1: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2, spent: 2, income: 2}, 1: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16, spent: 16, income: 16}, 1: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11, spent: 11, income: 11}, 1: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5, spent: 5, income: 5}, 1: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3, spent: 3, income: 3}, 1: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5, spent: 5, income: 5}, 1: {start: 5}},
            [Powers.ITALY]: {0: {start: 7, spent: 7, income: 7}, 1: {start: 7}},
            [Powers.USA]: {0: {start: 6, spent: 6, income: 6}, 1: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6, spent: 6, income: 6}, 1: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.NATIONALIST_CHINA
        };
        expect(turnReducer(state, nextTurn())).toEqual({
            [Powers.GERMANY]: {0: {start: 20, spent: 20, income: 20}, 1: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8, spent: 8, income: 8}, 1: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2, spent: 2, income: 2}, 1: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16, spent: 16, income: 16}, 1: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11, spent: 11, income: 11}, 1: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5, spent: 5, income: 5}, 1: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3, spent: 3, income: 3}, 1: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5, spent: 5, income: 5}, 1: {start: 5}},
            [Powers.ITALY]: {0: {start: 7, spent: 7, income: 7}, 1: {start: 7}},
            [Powers.USA]: {0: {start: 6, spent: 6, income: 6}, 1: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6, spent: 6, income: 6}, 1: {start: 6}},
            ids: [0, 1],
            currentId: 1,
            currentPower: Powers.GERMANY
        });
    });
    test('nextTurn no effect if not all powers have saved', () => {
        const state = {
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.NATIONALIST_CHINA
        };
        expect(turnReducer(state, nextTurn())).toEqual(state);
    });
    test('nextPower updates when not at end', () => {
        const state = {
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.GERMANY
        };
        expect(turnReducer(state, nextPower())).toEqual({
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.SOVIET_UNION
        });
    });
    test('nextPower no effect when at end', () => {
        const state = {
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.NATIONALIST_CHINA
        };
        expect(turnReducer(state, nextPower())).toEqual(state);
    });
    test('prevPower updates when not at start', () => {
        const state = {
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.SOVIET_UNION
        };
        expect(turnReducer(state, prevPower())).toEqual({
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.GERMANY
        });
    });
    test('prevPower no effect when at start', () => {
        const state = {
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.GERMANY
        };
        expect(turnReducer(state, prevPower())).toEqual({
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.GERMANY
        });
    });
    test('saveCurrent updates this turn and sets up next', () => {
        const state = {
            [Powers.GERMANY]: {0: {start: 20}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.GERMANY
        };
        expect(turnReducer(state, saveCurrent({spent: 15, income: 20}))).toEqual({
            [Powers.GERMANY]: {0: {start: 20, spent: 15, income: 20}, 1: {start: 25}},
            [Powers.SOVIET_UNION]: {0: {start: 8}},
            [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
            [Powers.JAPAN]: {0: {start: 16}},
            [Powers.UK_WEST]: {0: {start: 11}},
            [Powers.UK_EAST]: {0: {start: 5}},
            [Powers.ANZAC]: {0: {start: 3}},
            [Powers.FRANCE]: {0: {start: 5}},
            [Powers.ITALY]: {0: {start: 7}},
            [Powers.USA]: {0: {start: 6}},
            [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
            ids: [0, 1],
            currentId: 0,
            currentPower: Powers.GERMANY
        });
    });
});
