import React from 'react';
import './Pages.css';

export default function Courses() {
  const courses = [
    { id: 1, title: 'Introduction to Legal Practice', instructor: 'John Smith', level: 'Beginner' },
    { id: 2, title: 'Contract Law Fundamentals', instructor: 'Jane Doe', level: 'Intermediate' },
    { id: 3, title: 'Intellectual Property Rights', instructor: 'Mike Johnson', level: 'Advanced' },
    { id: 4, title: 'Business Law Essentials', instructor: 'Sarah Williams', level: 'Beginner' },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1>Courses</h1>
        <p className="subtitle">Learn from industry experts and advance your legal knowledge</p>
        
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p className="instructor">Instructor: {course.instructor}</p>
              <p className="level">Level: {course.level}</p>
              <button className="btn btn-primary">Enroll Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
