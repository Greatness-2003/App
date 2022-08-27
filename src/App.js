import React, { useState, useEffect } from "react";
import './App.css';

const schedule = {
  title: "William & Mary Courses for 2021-2022",
  "courses": {
    "FMATH112": {
      "id": "FMATH112",
      "meets": "TuTh 14:00-15:20",
      "title": "Calculus II"
    },
    "FDATA150": {
      "id": "FDATA150",
      "meets": "TuTh 9:30-10:50",
      "title": "Human Development"
    },
    "FCRWR212": {
      "id": "FCRWR212",
      "meets": "W 17:00-19:50",
      "title": "Intro to Creative Writing"
    },
    "FDATA146": {
      "id": "FDATA146",
      "meets": "TuTh 17:00-18:20",
      "title": "Intro to Data Science"
    },
    "FKINE480": {
      "id": "FKINE480",
      "meets": "No meeting time",
      "title": "Research in KNHS"
    },
    "SFREN102": {
      "id": "SFREN102",
      "meets": "MTuWThF 9:00-9:50",
      "title": "Elementary French II"
    },
    "SGIS201": {
      "id": "SGIS201",
      "meets": "MW 14:00-15:20",
      "title": "Introduction to GIS"
    },
    "SPSYC202": {
      "id": "SPSYC202",
      "meets": "MW 15:30-16:50",
      "title": "Intro Psy as a Social Science"
    },
    "SMATH104": {
      "id": "SMATH104",
      "meets": "MWF 8:00-8:50",
      "title": "Math Powered Flight"
    },
    "SMATH351": {
      "id": "SMATH351",
      "meets": "TuTh 17:00-18:20",
      "title": "Prob and Stats for Scientists"
    },
    "SKINE481": {
      "id": "SKINE481",
      "meets": "No meeting time",
      "title": "Research in KNHS"
    },
    "XCSCI241": {
      "id": "XCSCI241",
      "meets": "MTuWTh 10:10-12:00",
      "title": "Data Structures"
    },
  }
};
const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off" 
     checked={checked} onChange={()=> setTerm(term)} />
    <label class="btn btn-sucess m-1 p-2" htmlFor={term}> {term}</label>
  </>
);

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  {
    Object.values(terms).map(value => (
      <TermButton key={value} term={value} setTerm={setTerm} checked={value===term}/>
    ))
  }  
  </div>
);

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = Object.values(courses).filter(course=>term===getCourseTerm(course));
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
      { termCourses.map(course => <Course key={course.id} course={ course } />) }
      </div>
    </>
  );
};
  
const terms = { F: 'Fall', S: 'Spring', X: 'Summer'};
const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(-3)
);

const getCourseName = course => (
  course.id.slice(1, -3)
)
const Course = ({ course }) => (
  <div>
    <div className="card">
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } { getCourseName(course) } { getCourseNumber(course) }</div>
        <div className="card-text">
          <h5>{course.title}</h5>
          { course.meets }
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
    <div className="container">
      <Banner title={ schedule.title }/>
      <CourseList courses={ schedule.courses }/>
    </div>
  );


export default App;

// const [schedule, setSchedule] = useState();
//   const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
//   useEffect(() => {
//     const fetchSchedule = async () => {
//       const response = await fetch(url);
//       if (!response.ok) throw response;
//       const json = await response.json();
//       setSchedule(json);
//     }
//     fetchSchedule();
//   }, []);
//   if (!schedule) return <h1>Loading schedule...</h1>;
//   return