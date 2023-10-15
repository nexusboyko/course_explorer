import React from 'react'

const CourseItem = (props) => {
  return (
    <>
      <div className='text-lg font-mono flex align-middle'><span className='text-base'>📂</span>{props.title.substr(0, props.title.indexOf(':'))}</div>
      <ul>
        {props.assignments.length ? <li className='ms-5 text-sm' key={0}>Assignments</li> : ''}
        <ul>
          {
            props.assignments ? (
              props.assignments.map((a) => {
                return (
                  <li className='ms-10' key={a.id}>
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