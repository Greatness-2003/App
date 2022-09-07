import Course from "./Course.js";
import React, { useState } from "react";
import { getCourseTerm } from "./Course.js";
import { signInWithGoogle } from "../utilities/firebase.js";
import { signOut } from "../utilities/firebase.js";
import { useUserState } from "../utilities/firebase.js";

const terms = { F: 'Fall', S: 'Spring', W: 'Winter'}
const TermButton = ({term, setTerm, checked}) => (
    <>
      <input type="radio" id={term} className="btn-check" autoComplete="off" 
       checked={checked} onChange={()=> setTerm(term)} />
      <label className="btn btn-sucess m-1 p-2" htmlFor={term}>
      {term}
      </label>
    </>
);
const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);
const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

const TermSelector = ({term, setTerm}) => {
  const [user] = useUserState();
  return (
    <div className="btn-toolbar justify-content-between">
      <div className="btn-group">
    {
      Object.values(terms).map(value => (
        <TermButton key={value} term={value} setTerm={setTerm} checked={value===term}/>
      ))
    }  
      </div>
      { user ? <SignInButton /> : <SignInButton /> }
    </div>
  );
};
const scheduleChanged = (selected, courses) => (
  selected.some(course => course !== courses[course.number])
);
const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  if (scheduleChanged(selected, courses)) {
    setSelected([])
  };
  const termCourses = Object.values(courses).filter(course=>term===getCourseTerm(course));
  return (
      <>
        <TermSelector term={term} setTerm={setTerm} />
        <div className="course-list">
        { termCourses.map(course => 
            <Course key={course.number} course={ course } selected={selected} setSelected={ setSelected }
            />) }
        </div>
      </>
  );
};

export default CourseList;