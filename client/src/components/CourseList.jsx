import React, { useState, useEffect } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3001/courses/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch courses");

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={course.id || index}>{course.name}</li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CourseList;
