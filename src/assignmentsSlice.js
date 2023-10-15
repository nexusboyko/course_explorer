import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from './api/axios';
// import { Axios, AxiosError } from 'axios';

const initState = {
  assignments: [],
  status: '',
  error: ''
};

export const getCourseAssignmentsById = createAsyncThunk(
  'getCourseAssignmentsById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/canvas/${id}/assignments`);

      return {
        id: id,
        assignments: res.data
      };
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response?.data);
    }
  }
);

const assignmentsSlice = createSlice({
  name: 'courses',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseAssignmentsById.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.error = '';
        state.assignments.indexOf(action.payload) === -1 ? state.assignments.push(action.payload) : console.log('duplicate!');
      })
      .addCase(getCourseAssignmentsById.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getCourseAssignmentsById.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        } else state.error = 'Server Error';
      });
  }
});

export default assignmentsSlice.reducer;
