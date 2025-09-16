import Navbar from "../components/Navbar";
import React, { useState } from "react";


const timetables = [
  {
    id: 1,
    name: "Timetable 1",
    schedule: {
      Monday: {
        "8:00-10:00": { subject: "FREE", code: "-", duration: "-" },
        "10:00-12:00": {
          subject: "Physics",
          code: "PHY102",
          duration: "1 hours",
        },
        "1:00-3:00": {
          subject: "Chemistry",
          code: "CHM103",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "Biology",
          code: "BIO104",
          duration: "2 hours",
        },
      },
      Tuesday: {
        "8:00-10:00": {
          subject: "English",
          code: "ENG101",
          duration: "2 hours",
        },
        "10:00-12:00": {
          subject: "History",
          code: "HIS102",
          duration: "2 hours",
        },
        "1:00-3:00": {
          subject: "Geography",
          code: "GEO103",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "Economics",
          code: "ECO104",
          duration: "2 hours",
        },
      },
      Wednesday: {
        "8:00-10:00": { subject: "Math", code: "MTH101", duration: "2 hours" },
        "10:00-12:00": {
          subject: "Physics",
          code: "PHY102",
          duration: "2 hours",
        },
        "1:00-3:00": { subject: "FREE", code: "-", duration: "-" },
        "3:00-5:00": {
          subject: "Biology",
          code: "BIO104",
          duration: "2 hours",
        },
      },
      Thursday: {
        "8:00-10:00": {
          subject: "English",
          code: "ENG101",
          duration: "2 hours",
        },
        "10:00-12:00": { subject: "FREE", code: "-", duration: "-" },
        "1:00-3:00": {
          subject: "Geography",
          code: "GEO103",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "Economics",
          code: "ECO104",
          duration: "2 hours",
        },
      },
      Friday: {
        "8:00-10:00": { subject: "Math", code: "MTH101", duration: "2 hours" },
        "10:00-12:00": {
          subject: "Physics",
          code: "PHY102",
          duration: "2 hours",
        },
        "1:00-3:00": {
          subject: "Chemistry",
          code: "CHM103",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "Biology",
          code: "BIO104",
          duration: "2 hours",
        },
      },
      Saturday: {
        "8:00-10:00": {
          subject: "English",
          code: "ENG101",
          duration: "2 hours",
        },
        "10:00-12:00": {
          subject: "History",
          code: "HIS102",
          duration: "2 hours",
        },
        "1:00-3:00": {
          subject: "Geography",
          code: "GEO103",
          duration: "2 hours",
        },
        "3:00-5:00": { subject: "FREE", code: "-", duration: "-" },
      },
    },
    missedSubjects: [
      { subject: "Math", code: "MTH101" },
      { subject: "Physics", code: "PHY102" },
      { subject: "Math", code: "MTH101" },
      { subject: "Physics", code: "PHY102" },
      { subject: "History", code: "HIS102" },
    ],
  },
  {
    id: 2,
    name: "Timetable 2",
    schedule: {
      Monday: {
        "8:00-10:00": {
          subject: "Geography",
          code: "GEO103",
          duration: "2 hours",
        },
        "10:00-12:00": {
          subject: "Economics",
          code: "ECO104",
          duration: "2 hours",
        },
        "1:00-3:00": { subject: "Math", code: "MTH101", duration: "2 hours" },
        "3:00-5:00": {
          subject: "Physics",
          code: "PHY102",
          duration: "2 hours",
        },
      },
      Tuesday: {
        "8:00-10:00": {
          subject: "History",
          code: "HIS102",
          duration: "2 hours",
        },
        "10:00-12:00": {
          subject: "Chemistry",
          code: "CHM103",
          duration: "2 hours",
        },
        "1:00-3:00": {
          subject: "Biology",
          code: "BIO104",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "English",
          code: "ENG101",
          duration: "2 hours",
        },
      },
      Wednesday: {
        "8:00-10:00": {
          subject: "Economics",
          code: "ECO104",
          duration: "2 hours",
        },
        "10:00-12:00": {
          subject: "Geography",
          code: "GEO103",
          duration: "2 hours",
        },
        "1:00-3:00": { subject: "Math", code: "MTH101", duration: "2 hours" },
        "3:00-5:00": {
          subject: "History",
          code: "HIS102",
          duration: "2 hours",
        },
      },
      Thursday: {
        "8:00-10:00": {
          subject: "Chemistry",
          code: "CHM103",
          duration: "2 hours",
        },
        "10:00-12:00": {
          subject: "Physics",
          code: "PHY102",
          duration: "2 hours",
        },
        "1:00-3:00": {
          subject: "English",
          code: "ENG101",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "Biology",
          code: "BIO104",
          duration: "2 hours",
        },
      },
      Friday: {
        "8:00-10:00": { subject: "Math", code: "MTH101", duration: "2 hours" },
        "10:00-12:00": {
          subject: "Geography",
          code: "GEO103",
          duration: "2 hours",
        },
        "1:00-3:00": {
          subject: "Economics",
          code: "ECO104",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "History",
          code: "HIS102",
          duration: "2 hours",
        },
      },
      Saturday: {
        "8:00-10:00": {
          subject: "Physics",
          code: "PHY102",
          duration: "2 hours",
        },
        "10:00-12:00": {
          subject: "Chemistry",
          code: "CHM103",
          duration: "2 hours",
        },
        "1:00-3:00": {
          subject: "English",
          code: "ENG101",
          duration: "2 hours",
        },
        "3:00-5:00": {
          subject: "Biology",
          code: "BIO104",
          duration: "2 hours",
        },
      },
    },
    missedSubjects: [
      { subject: "Physics", code: "PHY102" },
      { subject: "Math", code: "MTH101" },
      { subject: "Physics", code: "PHY102" },
    ],
  },
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeSlots = ["8:00-10:00", "10:00-12:00", "1:00-3:00", "3:00-5:00"];

const Timetable = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTimetable = timetables[currentIndex];

  const nextTimetable = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % timetables.length);
  };

  const prevTimetable = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? timetables.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen dark:bg-dark">
      <Navbar login={true} profile={true}/>
      <div className="flex flex-col justify-center items-center mt-8 gap-6 px-4 w-full">
        {/* Timetable Section */}
        <div className="w-full max-w-5xl p-6 bg-dark/5 dark:bg-white/5 backdrop-blur-sm border border-dark/20 dark:border-white/20 rounded-4xl">
          <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
            {currentTimetable.name}
          </h2>

          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[600px] border-collapse border border-dark/20 dark:border-white/20">
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
                {timeSlots.map((slot) => (
                  <tr
                    key={slot}
                    className="hover:bg-dark/10 dark:hover:bg-white/10"
                  >
                    <td className="border border-dark/20 dark:border-white/20 px-4 py-2 font-semibold dark:text-white bg-dark/5 dark:bg-white/5">
                      {slot}
                    </td>
                    {days.map((day) => {
                      const cell = currentTimetable.schedule[day]?.[slot];
                      return (
                        <td
                          key={day + slot}
                          className="border border-dark/20 dark:border-white/20 px-4 py-2 dark:text-white align-top"
                        >
                          {cell.subject !== "FREE" ? (
                            <div className="flex flex-col items-start">
                              <div className="text-blue-600 dark:text-blue-400 font-bold">
                                {cell.subject}
                              </div>
                              <div className="text-dark/60 dark:text-white/60 text-sm">
                                {cell.code}
                              </div>
                              <div className="text-dark/40 dark:text-white/40 text-xs">
                                {cell.duration}
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

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button
              onClick={prevTimetable}
              className="px-4 py-2 bg-dark/20 dark:bg-white/20 border border-dark/30 dark:border-white/30 rounded-2xl hover:bg-dark/30 dark:hover:bg-white/30 dark:text-white"
            >
              Previous
            </button>
            <button
              onClick={nextTimetable}
              className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>

        {/* Missed Subjects Section */}
        <div className="w-full max-w-2xl p-4 bg-dark/5 dark:bg-white/5 backdrop-blur-sm border border-dark/20 dark:border-white/20 rounded-4xl">
          <h3 className="text-lg font-bold mb-3 dark:text-white text-center">
            Missed Subjects
          </h3>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {currentTimetable.missedSubjects.map((item, index) => (
              <div
                key={index}
                className="p-2 bg-dark/10 dark:bg-white/10 border border-dark/20 dark:border-white/20 rounded-xl flex flex-col items-center text-center break-words"
              >
                <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  {item.subject}
                </div>
                <div className="text-dark/60 dark:text-white/60 text-xs">
                  {item.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
