import Navbar from "../components/Navbar";
import  { useEffect, useState } from "react";
import api from "../Lib/axios";
import { Link,useNavigate } from "react-router";
import toast from 'react-hot-toast'
import transformBackendTimetable from '../utils/transformTimetable.js';
import transformData from "../Lib/selectedSub.js";

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const timeSlots = ["8:00-10:00","10:00-12:00","1:00-3:00","3:00-5:00"];

const Timetable = () => {
  const navigate = useNavigate();
  const [timetables, setTimetables] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/timetables');
        const backendTables = response.data.tables; 
        const genTables = backendTables.map((tt, idx) => ({
          name: `Timetable ${idx + 1}`,
          timetable: transformBackendTimetable(tt.timetable), 
          missedSubjects: tt.missedSubjects || [],
          score: tt.score || 0
        }));
        setTimetables(genTables);
      } catch (error) {
        console.error(error);
        toast.error("Authentication error");
        navigate('/login')
      }
    }
    fetchData();
  }, []);

  const currentTimetable = timetables[currentIndex] || null;
  const nextTimetable = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % timetables.length);
  };

  const prevTimetable = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? timetables.length - 1 : prevIndex - 1);
  };

  if (!currentTimetable) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;  
  
  const handleEdit = async () => {

    // console.log(timetables)
    const selectedTimetable = await transformData(timetables);
    // console.log("In timetable" , JSON.stringify(selectedTimetable))
    localStorage.setItem("selectedSubjectsEdit", JSON.stringify(selectedTimetable[currentIndex]));
    navigate('/main');
  }

  const handleNew = () => {
    localStorage.removeItem("selectedSubjectsEdit")
    navigate('/main');
  }
  
  return (
    <div className="min-h-screen dark:bg-dark">
      <Navbar login={true} profile={true} />

      <div className="flex flex-col justify-center items-center mt-8 gap-6 px-4 w-full">
        {/* Timetable Table */}
        <div className="w-full max-w-5xl p-6 bg-dark/5 dark:bg-white/5 backdrop-blur-sm border border-dark/20 dark:border-white/20 rounded-4xl">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
              {currentTimetable.name}
            </h2>
            <div>
              <button onClick={handleEdit} className="btn bg-blue-700 dark:text-white  dark:text-dark px-4 font-bold mx-3">
                Edit
              </button>
              <button onClick={handleNew} className="btn bg-dark dark:bg-white dark:text-dark px-4 font-bold">
                New
              </button>
            </div>
          </div>

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
                      const cell = currentTimetable.timetable[day]?.[slot];
                      return (
                        <td
                          key={day + slot}
                          className="border border-dark/20 dark:border-white/20 px-4 py-2 dark:text-white align-top"
                        >
                          {cell?.subjectSlot && cell.subjectSlot !== "FREE" ? (
                            <div className="flex flex-col items-start">
                              <div className="relative group max-w-[100px]">
                                <div className="text-blue-600 dark:text-blue-400 font-bold line-clamp-2">
                                  {cell.subject}
                                </div>
                                <div
                                  className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 
                                                hidden group-hover:block bg-dark/90 dark:bg-white/90 
                                                text-white dark:text-black text-xs px-2 py-1 rounded shadow-lg 
                                                whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                                >
                                  {cell.subject}
                                </div>
                              </div>
                              <div className="text-dark/60 dark:text-white/60 text-sm">
                                {cell.subjectSlot}
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
              className="px-4 py-2 bg-blue-600 dark:text-white border border-blue-800/30 rounded-2xl hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>

        {/* Missed Subjects Section */}
        {currentTimetable.missedSubjects.length != 0 && (
          <div className="w-full max-w-2xl p-4 bg-dark/5 dark:bg-white/5 backdrop-blur-sm border border-dark/20 dark:border-white/20 rounded-4xl">
            <h3 className="text-lg font-bold mb-3 dark:text-white text-center">
              Missed Subjects
            </h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {currentTimetable.missedSubjects?.map((item, index) => (
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
        )}
      </div>
    </div>
  );
};

export default Timetable;
