import React, { useState, useEffect } from "react";
import { Link } from "react-router";

import Navbar from "../components/Navbar";
import Sidebar from "../Components/Sidebar";
import EnrollmentPanel from "../Components/EnrollmentPanel";
import subjectsData from "./simplified.json";
import api from "../Lib/axios";
import toast from "react-hot-toast";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timetable, setTimetable] = useState(null);

  const [selectedSubjects, setSelectedSubjects] = useState(() => {
    const saved =
      JSON.parse(localStorage.getItem("selectedSubjectsEdit")) || [];

    return saved
      .map((s) => {
        const subj = subjectsData.find((sub) => sub.code === s.code);
        if (!subj) return null;

        // Get all unique staff
        const staffList = subj.schedules.map((sch) => sch.staff);
        const uniqueStaff = [...new Set(staffList)];

        // Use saved preferredStaff if exists, otherwise initialize all to true
        const preferredStaff = s.preferredStaff
          ? {
              ...Object.fromEntries(uniqueStaff.map((staff) => [staff, true])),
              ...s.preferredStaff,
            }
          : Object.fromEntries(uniqueStaff.map((staff) => [staff, true]));

        return { ...subj, preferredStaff };
      })
      .filter(Boolean);
  });

  const filteredSubjects = subjectsData.filter((subj) => {
    if (!searchTerm) return true;
    if (searchTerm.length > 0 && "0123456789".includes(searchTerm[0])) {
      return subj.code.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return subj.subject.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  useEffect(() => {
    localStorage.setItem("selectedSubjects", JSON.stringify(selectedSubjects));
  }, [selectedSubjects]);


  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["8:00-10:00", "10:00-12:00", "1:00-3:00", "3:00-5:00"];

  const handleAddSubject = (subject) => {
    console.log(subject);
    if (selectedSubjects.length >= 13) {
      alert("You can select a maximum of 13 subjects.");
      return;
    }

    if (!selectedSubjects.find((s) => s.code === subject.code)) {
      const staffList = subject.schedules.map((sch) => sch.staff);
      const uniqueStaff = [...new Set(staffList)];

      const preferredStaff = uniqueStaff.reduce((acc, staff) => {
        acc[staff] = true;
        return acc;
      }, {});

      setSelectedSubjects([
        ...selectedSubjects,
        { ...subject, preferredStaff },
      ]);
    }
  };

  const handleDeleteSubject = (code) => {
    setSelectedSubjects((prev) => {
      const updated = prev.filter((subj) => subj.code !== code);
      localStorage.setItem("selectedSubjectsEdit", JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateStaff = (code, staffOrBulk, isBulk = false) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.map((subj) => {
        if (subj.code === code) {
          if (isBulk) {
            return {
              ...subj,
              preferredStaff: staffOrBulk,
            };
          } else {
            return {
              ...subj,
              preferredStaff: {
                ...subj.preferredStaff,
                [staffOrBulk]: !subj.preferredStaff[staffOrBulk],
              },
            };
          }
        }
        return subj;
      })
    );
  };

  const handleGenerateTimetable = async () => {
    console.log(selectedSubjects);
    const timetable = {
      timetable: selectedSubjects.map((subj) => ({
        code: subj.code,
        staff: Object.keys(subj.preferredStaff).filter(
          (staff) => subj.preferredStaff[staff]
        ),
      })),
    };

    console.log("Sending to backend:", timetable);

    try {
      const response = await api.post("/timetables", timetable);
      console.log(response);
      if (!response.data.success) {
        toast.error("Something went wrong");
        
      }
      if(response.data.success)
        setTimetable(response.data.timetable);
    } catch (error) {
      console.error("Error generating timetable:", error);
    }
  };

  if(timetable){
    return (<>
      <div className="overflow-x-auto dark:bg-dark h-screen">
        <h1 className="dark:text-white text-5xl text-center p-10">Generated TimeTable</h1>
        <table className="w-[90%] min-w-[650px] m-auto border-collapse border backdrop-blur-md border-dark/20 dark:border-white/10">
          <thead className="bg-dark/10 dark:bg-white/10">
            <tr>
              <th className="border border-dark/20 dark:border-white/20 px-4 py-3 text-left dark:text-white">
                Time / Day
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border border-dark/20 dark:border-white/20 px-4 py-3 text-left dark:text-white"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot,i) => (
              <tr
                key={slot}
                className="hover:bg-dark/10 dark:hover:bg-white/10"
              >
                <td className="border border-dark/20 dark:border-white/20 px-4 py-2 font-semibold dark:text-white bg-dark/5 dark:bg-white/5">
                  {slot}
                </td>
                {days.map((day) => {  
                  const cell = timetable[day]?.[i];
                  // console.log(timetable[day][i]);
                  console.log(cell,"cell");
                  return (
                    <td
                      key={day + slot}
                      className="border border-dark/20 dark:border-white/20 px-4 py-2 dark:text-white align-top"
                    >
                      {(cell && cell !== "empty") ? (
                        <div className="flex flex-col items-start">
                          <div className="relative group max-w-[100px]">
                            <div className="text-blue-600 dark:text-blue-400 font-bold line-clamp-2">
                              {cell[2]}
                            </div>
                            <div
                              className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 
                                                hidden group-hover:block bg-dark/90 dark:bg-white/90 
                                                text-white dark:text-black text-xs px-2 py-1 rounded shadow-lg 
                                                whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                            >
                              {cell[1]}
                            </div>
                          </div>
                          <div className="text-dark/60 dark:text-white/60 text-sm">
                            {cell[0]}
                          </div>
                          <div className="text-dark/40 dark:text-white/40 text-xs">
                            {cell[3]}
                          </div>
                        </div>
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                          Free
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>)
  }

  return (

    
    <div className="dark:bg-dark min-h-screen">
      <Navbar/>
      <div className="flex">
        <Sidebar
          subjects={filteredSubjects}
          onAddSubject={handleAddSubject}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="w-[60%]">
          
          <EnrollmentPanel
            selectedSubjects={selectedSubjects}
            onUpdateStaff={handleUpdateStaff}
            onGenerate={handleGenerateTimetable}
            onDeleteSubject={handleDeleteSubject}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
