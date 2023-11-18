const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  name: '',
  number: '',
};

const dataContactSlice = createSlice({
  name: 'dataContact',
  initialState,
  reducers: {
    setName(state, { payload }) {
      state.name = payload;
    },
    setNumber(state, { payload }) {
      state.number = payload;
    },
  },
});

export const { setName, setNumber } = dataContactSlice.actions;

export const dataContactReducer = dataContactSlice.reducer;
