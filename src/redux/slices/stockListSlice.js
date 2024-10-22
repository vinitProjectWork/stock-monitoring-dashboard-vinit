import { createSlice } from '@reduxjs/toolkit'

export const stockListSlice = createSlice({
    name: 'stockList',
    initialState: {
        stockListData: [],
        data: [],
        filter: null,
    },
    reducers: {
        addStockListData: (state, action) => {
            state.stockListData = action?.payload
        },
        handelfilter: (state, action) => {
            state.filter = action?.payload
        },
        addStock: (state, action) => {
            state.data = action?.payload
        },
        removeStock: (state, action) => {
            state.data = state?.data?.filter((x) => x.title !== action?.payload?.title)
        },
    }
})

// Action creators are generated for each case reducer function
export const { addStock, handelfilter, addStockListData, removeStock } = stockListSlice.actions

export default stockListSlice.reducer