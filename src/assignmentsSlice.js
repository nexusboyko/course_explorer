import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from './api/axios';
// import { Axios, AxiosError } from 'axios';

const initState = {
  assignments: [],
  status: '',
  error: ''
};

export const getCourseAssignmentsFromCSE = createAsyncThunk(
  'getCourseAssignmentsFromCSE',
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/scrape/cse`);
      console.log('cse', res);
      
      return res.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getCourseAssignmentsById = createAsyncThunk(
  'getCourseAssignmentsById',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/canvas/${id}/assignments`);

      return {
        id: id,
        name: name,
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
      })
      .addCase(getCourseAssignmentsFromCSE.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.error = '';
        console.log('payload', action.payload);

        

        Object.keys(action.payload).forEach(function(key) {
          console.log('Key : ' + key + ', Value : ')

          state.assignments.find(function(item, i){
            if(item.name.includes(key)){
              
              Object.keys(action.payload[key]).forEach(function(key2) {
              //  console.log('Key : ' + key2 + ', Value : ' + action.payload[key][key2])
                item.assignments.push(...action.payload[key][key2])
              })

            }
          });

          
        })

      })
      .addCase(getCourseAssignmentsFromCSE.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getCourseAssignmentsFromCSE.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        } else state.error = 'Server Error';
      });
  }
});

export default assignmentsSlice.reducer;
