import React, { useState } from 'react';

const EnrollmentPanel = ({ selectedSubjects, onUpdateStaff, onGenerate, onDeleteSubject }) => {
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const toggleExpand = (code) => {
    setExpandedSubjects(prev => ({ ...prev, [code]: !prev[code] }));
  };

  return (
    <div className="flex-1 m-5 p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-y-auto">
      <h2 className="text-xl font-bold text-dark dark:text-white">Selected Subjects</h2>
      {selectedSubjects.length === 0 ? (
        <p className="text-dark/50 dark:text-white/50 mt-4">No subjects selected.</p>
      ) : (
        <div className="mt-4 space-y-6">
          {selectedSubjects.map((subj) => {
            const uniqueStaff = Array.from(new Set(subj.schedules.map(s => s.staff)));
            const isExpanded = expandedSubjects[subj.code] || false;

            return (
              <div key={subj.code} className="p-4 border rounded-lg bg-dark/10 dark:bg-white/10">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-dark dark:text-white">{subj.code} - {subj.subject}</h3>
                  <div className="flex items-center gap-2">
                    {/* Collapse/Expand */}
                    <button
                      onClick={() => toggleExpand(subj.code)}
                      className="p-1 rounded hover:bg-dark/20 dark:hover:bg-white/20 text-lg"
                    >
                      {isExpanded ? '▲' : '▼'}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onDeleteSubject(subj.code)}
                      className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-600 text-red-500 dark:text-red-400 text-lg"
                      title="Delete Subject"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-4">
                    <p className="text-sm text-dark/60 dark:text-white/60">Available Staff</p>
                    {uniqueStaff.map((staffName, index) => {
                      const isSelected = subj.preferredStaff[staffName] || false;
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-dark/20 dark:bg-white/20 rounded-lg">
                          <div>
                            <p className="font-medium text-dark dark:text-white">{staffName}</p>
                            <p className="text-sm text-dark/50 dark:text-white/50">
                              {subj.schedules.filter(s => s.staff === staffName).map(s => s.slot).join(', ')}
                            </p>
                          </div>
                          <button
                            onClick={() => onUpdateStaff(subj.code, staffName)}
                            className={`px-4 py-1 rounded-full font-medium ${
                              isSelected
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-200 text-dark hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <button
            onClick={onGenerate}
            disabled={selectedSubjects.length < 1}
            className={`mt-6 w-full py-2 rounded-lg text-white ${
              selectedSubjects.length < 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Generate Timetable
          </button>
        </div>
      )}
    </div>
  );
};

export default EnrollmentPanel;
