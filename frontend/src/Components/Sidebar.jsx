import React from 'react';

const Sidebar = ({ subjects, onAddSubject, searchTerm, setSearchTerm }) => {
  return (
    <div className="border w-[30%] sm:w-[35%] md:w-[35%] m-5 h-[80vh] bg-dark/5 border-dark/20 dark:bg-white/5 backdrop-blur-sm dark:border-white/20 rounded-3xl flex flex-col items-center overflow-y-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-11/12 m-4 p-2 border-2 border-dark rounded-lg dark:bg-gray-800 dark:text-white"
        placeholder="Search by name or code..."
      />
      <div className="w-full">
        {subjects.map((subject) => (
          <div key={subject.code} className="cursor-pointer w-11/12 mx-auto my-2 p-3 rounded-2xl bg-dark/30 dark:bg-white/50 hover:bg-blue-400 hover:text-white"
            onClick={() => onAddSubject(subject)}>
            {subject.code} - {subject.subject}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
