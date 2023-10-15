import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import CourseItem from './CourseItem';

import { connect, useDispatch } from 'react-redux';

import { getCourses } from '../coursesSlice';
import { getCourseAssignmentsById, getCourseAssignmentsFromCSE } from '../assignmentsSlice'

const CoursesList = (props) => {
  const dispatch = useDispatch();
  const [as, setAs] = useState([]);

  // get course list
  useEffect(() => {
    dispatch(getCourses({}))
  }, [])  
  
  useEffect(() => {
    console.log('courses', props.courses);

    // get assignments for each course
    return () => {
      props.courses.forEach(course => {
        dispatch(getCourseAssignmentsById({id: course.id, name: course.name}));
      })
      dispatch(getCourseAssignmentsFromCSE({}));
    }

  }, [props.courses])

  useEffect(() => {
    console.log('assignments', props.assignments);
    setAs(props.assignments);
  }, [props.assignments]);
  
  return (
    <>
      <ul>
      {
        // check if all course assignments were loaded
        as.length === props.courses.length ?
        (props.courses.map((course) => {
          const assignmentList = props.assignments ? props.assignments.find(t => t.id === course.id).assignments : 0;          
          return (
            <li key={course.id} className='mb-4'>
              <CourseItem id={course.id} title={course.name} assignments={assignmentList}/>
            </li>
          );
        }))
        : (
          <div className='flex items-center justify-center'>
            <small className='flex flex-col items-center justify-center'>
              <span className="loading loading-dots loading-md"></span>
              {as.length} / {props.courses.length} courses loaded
            </small>
          </div>
        )
        /* status: {props.status} */
      }
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return { 
    courses: state.courses.courses,
    assignments: state.assignments.assignments,
    status: state.courses.status 
  };
};

export default connect(mapStateToProps)(CoursesList);
