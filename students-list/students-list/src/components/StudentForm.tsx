import React, { useState } from 'react';
import { Student } from './types';
import './StudentForm.scss';

interface StudentFormProps {
  onStudentAdded: (students: Student[]) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onStudentAdded }) => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [performance, setPerformance] = useState('normal');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if both name and surname are provided
    const [firstName, lastName] = fullName.split(' ');
    if (!firstName || !lastName) {
      alert('Please enter both Name and SURNAME');
      return;
    }

    // Check if date of birth is in the future
    const today = new Date();
    const selectedDate = new Date(dateOfBirth);
    if (selectedDate > today) {
      alert('Please choose a date of birth from the Past.');
      return;
    }

    const student: Student = {
      id: '', // Generate unique ID here
      fullName: fullName,
      dateOfBirth: dateOfBirth,
      performance: performance,
    };

    // Call the onStudentAdded callback to pass the new student
    onStudentAdded([student]);

    // Clear form inputs
    setFullName('');
    setDateOfBirth('');
    setPerformance('normal');
  };

  return (
    <form onSubmit={handleSubmit} className='student-form'>
      <div className='form-group'>
        <label className='form-label' htmlFor='fullName'>
          Name and Surname:
        </label>
        <input
          type='text'
          id='fullName'
          placeholder='Enter full name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className='form-group'>
        <label className='form-label' htmlFor='dateOfBirth'>
          Date of Birth:
        </label>
        <input
          type='date'
          id='dateOfBirth'
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
      </div>

      <div className='form-group'>
        <label className='form-label' htmlFor='performance'>
          Performance:
        </label>
        <select
          id='performance'
          value={performance}
          onChange={(e) => setPerformance(e.target.value)}
          required>
          <option value='fail'>Fail</option>
          <option value='normal'>Normal</option>
          <option value='good'>Good</option>
          <option value='excellent'>Excellent</option>
        </select>
      </div>

      <button type='submit'>Add Student</button>
    </form>
  );
};

export default StudentForm;
