import { combineReducers } from '@reduxjs/toolkit';
import { turnReducer } from './turnSlice';

export const gameReducer = combineReducers({
    turn: turnReducer,
});
