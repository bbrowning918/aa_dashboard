import { combineReducers } from '@reduxjs/toolkit';
import { turnReducer } from './turnSlice';
import { ippReducer } from './ippSlice';

export const gameReducer = combineReducers({
    turn: turnReducer,
    ipp: ippReducer,
});
