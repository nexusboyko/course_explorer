import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from './api/axios';
// import { Axios, AxiosError } from 'axios';

const initState = {
  courses: [],
  status: '',
  error: ''
};

export const getCourses = createAsyncThunk(
  'getCourses',
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios.get('/canvas');
      
      return res.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response?.data);
    }
  }
);

const as = (courses) => {
  const list = [];

  courses.forEach(course => {
    // getCourseAssignmentsById({ id: course.id });
    
    list.push({
      name: course.name,
      id: course.id
    })
    // console.log(course.name, course.id);
  })

  return list;
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.error = '';
        state.courses = action.payload;

        console.log('list', as(state.courses));

      })
      .addCase(getCourses.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        } else state.error = 'Server Error';
      })
  }
});

export default coursesSlice.reducer;
