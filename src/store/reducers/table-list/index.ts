import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableListData, TableListState } from './types';
import { getTableList } from './reducers/extra-reducers';
import { mapTableData } from '../../../helpers';

const initialState: TableListState = {
  fetching: false,
  error: false,
  data: null,
};

const tableListSlice = createSlice({
  name: 'tableList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTableList.fulfilled, (state: TableListState, action: PayloadAction<TableListData>) => {
      state.fetching = false;
      state.error = false;
      state.data = mapTableData(action.payload);
    });
    builder.addCase(getTableList.pending, (state: TableListState) => {
      state.fetching = true;
    });
    builder.addCase(getTableList.rejected, (state: TableListState) => {
      state.fetching = false;
      state.error = true;
    });
  },
});

const tableListActions = tableListSlice.actions;

export { tableListSlice, tableListActions };
export default tableListSlice.reducer;
