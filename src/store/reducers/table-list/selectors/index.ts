import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../index';

const selectStore = (state: RootState) => state;

export const selectTableListState = createSelector(selectStore, (state) => state.tableList);
