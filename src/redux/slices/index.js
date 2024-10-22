import { combineReducers } from '@reduxjs/toolkit';
import { stockListSlice } from './stockListSlice';

const rootReducer = combineReducers({
    stockList: stockListSlice.reducer,
})

export default rootReducer
