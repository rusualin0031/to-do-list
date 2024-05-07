import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTaskList: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setTaskList, } = taskSlice.actions;

export default taskSlice.reducer;