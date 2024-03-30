import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentTeacherId, setNewStudentTeacherId] = useState('');
  const [editStudentId, setEditStudentId] = useState('');
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentEmail, setEditStudentEmail] = useState('');
  const [editStudentTeacherId, setEditStudentTeacherId] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');

  const addStudent = () => {
    if (!newStudentName || !newStudentEmail || !newStudentTeacherId) return;
    const newStudent = {
      id: Date.now(),
      name: newStudentName,
      email: newStudentEmail,
      teacherId: newStudentTeacherId
    };
    setStudents([...students, newStudent]);
    setNewStudentName('');
    setNewStudentEmail('');
    setNewStudentTeacherId('');
  };

  const deleteStudent = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const startEditStudent = (id, name, email, teacherId) => {
    setEditStudentId(id);
    setEditStudentName(name);
    setEditStudentEmail(email);
    setEditStudentTeacherId(teacherId);
  };

  const saveEditStudent = () => {
    const updatedStudents = students.map(student => {
      if (student.id === editStudentId) {
        return {
          ...student,
          name: editStudentName,
          email: editStudentEmail,
          teacherId: editStudentTeacherId
        };
      }
      return student;
    });
    setStudents(updatedStudents);
    setEditStudentId('');
    setEditStudentName('');
    setEditStudentEmail('');
    setEditStudentTeacherId('');
  };

  const cancelEditStudent = () => {
    setEditStudentId('');
    setEditStudentName('');
    setEditStudentEmail('');
    setEditStudentTeacherId('');
  };

  const addTeacher = () => {
    if (!newTeacherName) return;
    const newTeacher = {
      id: Date.now(),
      name: newTeacherName
    };
    setTeachers([...teachers, newTeacher]);
    setNewTeacherName('');
  };

  const deleteTeacher = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
    if (confirmDelete) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  return (
    <div className="container">
      <h1>Student Management</h1>

      <div className="form-container">
      
        <div className="form">
          <h2>Add Student</h2>
          <input
            type="text"
            placeholder="Name"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudentEmail}
            onChange={(e) => setNewStudentEmail(e.target.value)}
          />
          <select value={newStudentTeacherId} onChange={(e) => setNewStudentTeacherId(e.target.value)}>
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
          <button onClick={addStudent}>Add Student</button>
        </div>

      
        <div className="form">
          <h2>Add Teacher</h2>
          <input
            type="text"
            placeholder="Name"
            value={newTeacherName}
            onChange={(e) => setNewTeacherName(e.target.value)}
          />
          <button onClick={addTeacher}>Add Teacher</button>
        </div>
      </div>

      <div className="list-container">
        
        <div className="list">
          <h2>Student List</h2>
          <ul>
            {students.map(student => (
              <li key={student.id}>
                {student.name} - {student.email}
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
                <button onClick={() => startEditStudent(student.id, student.name, student.email, student.teacherId)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>

    
        <div className="list">
          <h2>Teacher List</h2>
          <ul>
            {teachers.map(teacher => (
              <li key={teacher.id}>
                {teacher.name}
                <button onClick={() => deleteTeacher(teacher.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

    
      {editStudentId && (
        <div className="form">
          <h2>Edit Student</h2>
          <input
            type="text"
            placeholder="Name"
            value={editStudentName}
            onChange={(e) => setEditStudentName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={editStudentEmail}
            onChange={(e) => setEditStudentEmail(e.target.value)}
          />
          <select value={editStudentTeacherId} onChange={(e) => setEditStudentTeacherId(e.target.value)}>
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
          <button onClick={saveEditStudent}>Save</button>
          <button onClick={cancelEditStudent}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
