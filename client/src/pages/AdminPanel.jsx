import React, { useState } from "react";
import StudentForm from "../components/StudentForm";

const AdminPanel = () => {
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleDeleteStudent = (student) => {
    console.log("Student deleted:", student);
  };

  const students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      courses: ["Math", "Science"],
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      courses: ["History"],
    },
  ];

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Student List</h3>
      {students.map((student) => (
        <div key={student.id}>
          <h4>
            {student.firstName} {student.lastName}
          </h4>
          <p>{student.email}</p>
          <button onClick={() => handleEditStudent(student)}>
            Edit Registration
          </button>
          <button onClick={() => handleDeleteStudent(student)}>
            Delete Student
          </button>
        </div>
      ))}

      {editingStudent && (
        <div>
          <h3>Editing Registration for {editingStudent.firstName}</h3>
          <StudentForm isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
