import React from 'react'

const CourseItem = (props) => {
  return (
    <>
      <div className='text-xl font-mono flex align-middle'><span className='text-base'>📂</span>{props.title}</div>
      <ul>
        {props.assignments.length ? <li className='ms-5 italic'>Assignments</li> : ''}
        <ul>
          {
            props.assignments ? (
              props.assignments.map((a) => {
                return (
                  <li className='ms-10'>
                    <span className='text-sm'>📄</span>
                    <a href={a.html_url} target='_blank'  className='text-blue-500 hover:underline'>{a.name}</a>
                  </li>
                );
              })
              ) 
            : 'nothing'
          }
        </ul>
      </ul>
    </>
  )
}

export default CourseItem