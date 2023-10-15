import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import coursesReducer from './coursesSlice';
import assignmentsReducer from './assignmentsSlice'

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    assignments: assignmentsReducer
  },
  preloadedState: {}
});

export const useAppDispatch = () => useDispatch;

export default store;
