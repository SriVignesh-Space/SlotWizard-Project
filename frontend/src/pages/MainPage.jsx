import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import Navbar from '../components/Navbar';
import Sidebar from '../Components/Sidebar';
import EnrollmentPanel from '../Components/EnrollmentPanel';
import subjectsData from './simplified.json';
import api from '../Lib/axios';


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
  React.useEffect(() => {
    console.log("📌 Current selectedSubjects:", selectedSubjects);
  }, [selectedSubjects]);

  const handleAddSubject = (subject) => {
      if (selectedSubjects.length >= 13) {
        alert('You can select a maximum of 13 subjects.');
        return;
      }

      if (!selectedSubjects.find(s => s.code === subject.code)) {
        const staffList = subject.schedules.map(sch => sch.staff);
        const uniqueStaff = [...new Set(staffList)];

        const preferredStaff = uniqueStaff.reduce((acc, staff) => {
          acc[staff] = true;
          return acc;
        }, {});

        setSelectedSubjects([
          ...selectedSubjects,
          { ...subject, preferredStaff }
        ]);
      }

    };


  const handleDeleteSubject = (code) => {
  setSelectedSubjects(prev => prev.filter(subj => subj.code !== code));
  };

  const handleUpdateStaff = (code, staffOrBulk, isBulk = false) => {
    setSelectedSubjects(prevSubjects =>
      prevSubjects.map(subj => {
        if (subj.code === code) {
          if (isBulk) {
            return {
              ...subj,
              preferredStaff: staffOrBulk
            };
          } else {
            return {
              ...subj,
              preferredStaff: {
                ...subj.preferredStaff,
                [staffOrBulk]: !subj.preferredStaff[staffOrBulk]
              }
            };
          }
        }
        return subj;
      })
    );
  };



  const handleGenerateTimetable = async () => {
    const timetable = {
      timetable: selectedSubjects.map(subj => ({
        code: subj.code,
        staff: Object.keys(subj.preferredStaff).filter(staff => subj.preferredStaff[staff])
      }))
    };

    console.log("Sending to backend:", timetable); 

    try {
      const response = await api.post('/timetables', timetable);
      navigate('/timetable'); 
    } catch (error) {
      console.error("Error generating timetable:", error);
      alert("Failed to generate timetable. Check console for details.");
    }
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

