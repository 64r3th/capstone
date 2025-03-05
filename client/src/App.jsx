import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import StudentForm from "./components/StudentForm";
import CourseList from "./components/CourseList";

const App = () => {
  const [role, setRole] = useState("admin");
  setRole("student");

  return (
    <Router>
      <Navbar role={role} />

      <Routes>
        <Route path="/" element={<h2>Student Registration App</h2>} />

        <Route
          path="/register"
          element={role === "student" ? <StudentForm /> : <Navigate to="/" />}
        />

        <Route path="/courses" element={<CourseList />} />

        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
