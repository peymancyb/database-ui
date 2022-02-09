import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTablesList } from '../../../../api';

export const getTableList = createAsyncThunk(
  'tableList/getTableList',
  async () => {
    const response = await getTablesList();
    return response.data.result;
  },
);
