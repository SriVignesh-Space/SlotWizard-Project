import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import Navbar from '../components/Navbar';
import Sidebar from '../Components/Sidebar';
import EnrollmentPanel from '../Components/EnrollmentPanel';
import subjectsData from './simplified.json';


const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();

  const filteredSubjects = subjectsData.filter((subj) => {
    if (!searchTerm) return true;
    if (searchTerm.length > 0 && '0123456789'.includes(searchTerm[0])) {
      return subj.code.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return subj.subject.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const handleAddSubject = (subject) => {
    if (selectedSubjects.length >= 13) {
      alert('You can select a maximum of 13 subjects.');
      return;
    }

    if (!selectedSubjects.find(s => s.code === subject.code)) {
      setSelectedSubjects([...selectedSubjects, { ...subject, preferredStaff: {} }]);
    }
  };

  const handleDeleteSubject = (code) => {
  setSelectedSubjects(prev => prev.filter(subj => subj.code !== code));
  };
  const handleUpdateStaff = (code, staff) => {
    setSelectedSubjects(selectedSubjects.map(subj => {
      if (subj.code === code) {
        const current = subj.preferredStaff[staff] || false;
        return {
          ...subj,
          preferredStaff: {
            ...subj.preferredStaff,
            [staff]: !current
          }
        };
      }
      return subj;
    }));
  };

  const handleGenerateTimetable = () => {
    navigate('/timetable');
  };

  return (
    <div className="dark:bg-dark min-h-screen">
      <Navbar login={true} profile={true} />
      <div className="flex">
        <Sidebar
          subjects={filteredSubjects}
          onAddSubject={handleAddSubject}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <EnrollmentPanel
          selectedSubjects={selectedSubjects}
          onUpdateStaff={handleUpdateStaff}
          onGenerate={handleGenerateTimetable}
          onDeleteSubject={handleDeleteSubject} 
        />
      </div>
    </div>
  );
};

export default MainPage;

