import { turnReducer, nextPower, prevPower, saveCurrent } from './turnSlice';
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
    test('nextPower', () => {
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
    test('nextPower looping', () => {
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
            ids: [0, 1, 2],
            currentId: 1,
            currentPower: Powers.GERMANY
        });
    });
    test('prevPower', () => {
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
    test('prevPower looping', () => {
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
            ids: [0, 1, 2],
            currentId: 1,
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
            ids: [0, 1, 2],
            currentId: 0,
            currentPower: Powers.NATIONALIST_CHINA
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
    test('saveCurrent', () => {
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
