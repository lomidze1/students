import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { Student } from './components/types';
import './App.scss';

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Fetch students from local storage on component mount
    const storedStudents = JSON.parse(
      localStorage.getItem('students') || '[]'
    ) as Student[];
    setStudents(storedStudents);
  }, []);

  const handleStudentAdded = (newStudents: Student[]) => {
    // Generate unique IDs for new students
    const updatedStudentsWithId = newStudents.map((student, index) => ({
      ...student,
      id: `student_${students.length + index}`,
    }));

    const updatedStudents = [...students, ...updatedStudentsWithId];

    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };
  return (
    <div className='myApp'>
      <div className='form'>
        <StudentForm onStudentAdded={handleStudentAdded} />
      </div>
      <div className='students'>
        <StudentList students={students} setStudents={setStudents} />
      </div>
    </div>
  );
};

export default App;
