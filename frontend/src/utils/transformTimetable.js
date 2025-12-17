const transformBackendTimetable = (backendTable) => {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const timeSlots = ["8:00-10:00","10:00-12:00","1:00-3:00","3:00-5:00"];

  const table = {};

  days.forEach(day => {
    table[day] = {};
    backendTable[day].forEach((slotArr, index) => {
      if (slotArr !== "empty") {
      const [slot, code,subject,duration] = slotArr;
      table[day][timeSlots[index]] = {
        subject : subject,
        subjectSlot: slot, 
        code,
        duration: duration + " hours"
      };
    } else {
      table[day][timeSlots[index]] = { subjectSlot: "FREE", code: "-", duration: "-" };
    }

    });
  });

  return table;
};

export default transformBackendTimetable;
