async function transformData(dataArray) {
  const results = [];

  for (const data of dataArray) {
    const subjectMap = new Map(); // to avoid duplicates

    // Loop over timetable entries
    const tt = data.timetable;
    for (const day in tt) {
      for (const range in tt[day]) {
        const entry = tt[day][range];
        if (!entry.subject || entry.subjectSlot === "FREE") continue;

        if (!subjectMap.has(entry.code)) {
          subjectMap.set(entry.code, {
            subject: entry.subject,
            code: entry.code
          });
        }
      }
    }

    // Handle missedSubjects
    if (data.missedSubjects?.length) {
      for (const miss of data.missedSubjects) {
        if (!subjectMap.has(miss.code)) {
          subjectMap.set(miss.code, {
            subject: miss.subject,
            code: miss.code
          });
        }
      }
    }

    // Push simplified subjects to results
    results.push(Array.from(subjectMap.values()));
  }

  return results;
}

export default transformData;
