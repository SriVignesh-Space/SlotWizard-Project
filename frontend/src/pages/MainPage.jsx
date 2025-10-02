import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import Navbar from "../components/Navbar";
import Sidebar from "../Components/Sidebar";
import EnrollmentPanel from "../Components/EnrollmentPanel";
import subjectsData from "./simplified.json";
import api from "../Lib/axios";
import toast from "react-hot-toast";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const [user, setUser] = useState({});
  const navigate = useNavigate();

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

  React.useEffect(() => {
    async function LoggedIn() {
      try {
        const res = await api.get("/loggedin");
        if (!res.data.loggedIn) {
          toast.error("Authentication error");
          navigate("/login");
        }
        if (res.data.success) setUser(res.data.user);
      } catch (error) {
        console.log(error);
        toast.error("Authentication error");
        navigate("/login");
      }
    }
    LoggedIn();
  }, []);

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
      if (!response.data.success) {
        toast.error("Something went wrong");
        navigate("login");
      }
      navigate("/timetable");
    } catch (error) {
      console.error("Error generating timetable:", error);
      toast.error("Authentication error");
      navigate("/login");
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
        <div className="w-[60%]">
          {user.tables?.length != 0 && (
            <div className="mt-1 backdrop-blur-md flex justify-end">
              <Link to={"/timetable"}>
                <button className="btn bg-blue-700 m-2 cursor-pointer font-bold">
                  Existing timetable
                </button>
              </Link>
            </div>
          )}
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
