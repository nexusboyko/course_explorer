import React, { useEffect, useState } from 'react';
import CourseItem from './CourseItem';
import axios from '../api/axios';

const getCourses = async () => {
  axios.get('/canvas')
  .then((res) => {
    return res.data;
  })
  .then((err) => {
    console.log(err)
  })
  // const res = axios.get('/canvas');
  // return res.data;
}


const getCourseAssignments = async (courses) => {  
  const assignments = [];

  courses.forEach(course => {
    axios.get(`/canvas/${course.id}/assignments`).then((res) => {
      assignments.push({
        title: course.name,
        assignments: res.data
      })
    })
  })

  return assignments;

  // const id = 100000001661599;
  // axios.get(`/canvas/${id}`).then((res) => {
  //   console.log('assign', res.data);
  // }).then((err) => {
  //   console.log(err);
  // })
}


const CoursesList = () => {  
  return (
    <>
      <ul className='list-inside list-disc'>
        <li>Course</li>
        <ul className='ms-5 list-inside list-disc'>
          <li>Resource Type</li>
          <ul className='ms-10 list-inside list-disc'>
            <li>Resource</li>
          </ul>
        </ul>
      </ul>

      <div>
        <CourseItem title={'HW3'} />
      </div>
    </>
  );
};

export default CoursesList;
