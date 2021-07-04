import { uiReducer, toggleTurnDialog } from './uiSlice';

describe('uiSlice tests', () => {
    test('initialized state', () => {
        expect(uiReducer(undefined, {type: undefined})).toEqual({
            turnDialogVisibility: false
        });
    });
    test('toggleTurnDialog opens', () => {
        const state = {
            turnDialogVisibility: false
        };
        expect(uiReducer(state, toggleTurnDialog())).toEqual({
            turnDialogVisibility: true
        });
    });
    test('toggleTurnDialog closes', () => {
        const state = {
            turnDialogVisibility: true
        };
        expect(uiReducer(state, toggleTurnDialog())).toEqual({
            turnDialogVisibility: false
        });
    });
});