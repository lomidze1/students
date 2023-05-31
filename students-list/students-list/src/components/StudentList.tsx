import React, { useState } from 'react';
import { Student } from './types';
import './StudentList.scss';

interface StudentListProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentList: React.FC<StudentListProps> = ({ students, setStudents }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedFullName, setEditedFullName] = useState('');
  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedPerformance, setEditedPerformance] = useState('');

  const handleDelete = (id: string) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const handleEdit = (index: number) => {
    const student = students[index];
    setEditIndex(index);
    setEditedFullName(student.fullName);
    setEditedDateOfBirth(student.dateOfBirth);
    setEditedPerformance(student.performance);
  };

  const handleSave = () => {
    if (editIndex === -1) {
      return;
    }

    const updatedStudents = [...students];
    const selectedStudent = updatedStudents[editIndex];

    if (!selectedStudent) {
      return;
    }

    // Validate the entered performance value
    const availableOptions = ['fail', 'normal', 'good', 'excellent'];
    if (!availableOptions.includes(editedPerformance)) {
      alert('Invalid performance value');
      return;
    }

    selectedStudent.fullName = editedFullName;
    selectedStudent.dateOfBirth = editedDateOfBirth;
    selectedStudent.performance = editedPerformance;

    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    setEditIndex(-1);
    setEditedFullName('');
    setEditedDateOfBirth('');
    setEditedPerformance('');
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditedFullName('');
    setEditedDateOfBirth('');
    setEditedPerformance('');
  };

  const isEditing = (index: number) => {
    return index === editIndex;
  };

  return (
    <div className='student-list'>
      {students.map((student, index) => (
        <div
          key={`student_${Math.floor(Math.random() * 1000000)}`}
          className='student-item'>
          {isEditing(index) ? (
            <div>
              <label htmlFor={`fullName_${index}`}>Full Name:</label>
              <input
                type='text'
                id={`fullName_${index}`}
                value={editedFullName}
                onChange={(e) => setEditedFullName(e.target.value)}
              />
              <label htmlFor={`dateOfBirth_${index}`}>Date of Birth:</label>
              <input
                type='date'
                id={`dateOfBirth_${index}`}
                value={editedDateOfBirth}
                onChange={(e) => setEditedDateOfBirth(e.target.value)}
              />
              <label htmlFor={`performance_${index}`}>Performance:</label>
              <select
                id={`performance_${index}`}
                value={editedPerformance}
                onChange={(e) => setEditedPerformance(e.target.value)}>
                <option value='fail'>Fail</option>
                <option value='normal'>Normal</option>
                <option value='good'>Good</option>
                <option value='excellent'>Excellent</option>
              </select>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{student.fullName}</h3>
              <p>Date of Birth: {student.dateOfBirth}</p>
              <p>Performance: {student.performance}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentList;
