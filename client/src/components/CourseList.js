import React, { useState, useEffect } from "react";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleRegister = (courseId) => {
    console.log("Registered for course ID:", courseId);
    setSelectedCourse(courseId);
  };

  return (
    <div>
      <h2>Select a Course</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name}{" "}
              <button onClick={() => handleRegister(course.id)}>
                {selectedCourse === course.id ? "Unregister" : "Register"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CoursesList;
