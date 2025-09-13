import fs from "fs";
import path from "path";

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/services/simplified.json"), "utf-8"));


export const generateTimetable = async (input) => {
    let final_res = {};
    let final_score = 0;
    const results = input.map(userInput => {
        const subject = data.find(subj => subj.code === userInput.code);
        return {
            code: subject.code,
            credits: subject.credits,
            schedules: subject.schedules.filter(sch =>
            userInput.staff.includes(sch.staff)
            )
        };
    });
  final_res = {};
  final_score = 0;

  const table = {
    Monday: ["empty", "empty", "empty", "empty"],
    Tuesday: ["empty", "empty", "empty", "empty"],
    Wednesday: ["empty", "empty", "empty", "empty"],
    Thursday: ["empty", "empty", "empty", "empty"],
    Friday: ["empty", "empty", "empty", "empty"],
    Saturday: ["empty", "empty", "empty", "empty"],
  };

    // function -> returns the time which slot takes place 
    function check(cur_schedules,i){
        const timeIndex = { "08:00": 0, "10:00": 1, "13:00": 2, "15:00": 3 };
        return timeIndex[cur_schedules.times[i].from.toString()]
    } 

    //function -> check if it is safe for the current slot 
    function is_safe(timetable,day1,day2,time1,time2){
    // check if slot has 2 days .. if not then only check for one day
        if (timetable[day1][time1] === "empty" && (day2==="None" || timetable[day2][time2]==="empty" ))return true;
        return false;
    }

    function backtrack(results, size, cur_ind, score, timetable) {
        // base case
        if (cur_ind >= size || score >= 33) {
            if (score > final_score) {
            final_score = score;
            final_res = JSON.parse(JSON.stringify(timetable));
            }
            return;
        }

        const cur_subject = results[cur_ind];
        if (!cur_subject || !Array.isArray(cur_subject.schedules)) {
            backtrack(results, size, cur_ind + 1, score, timetable);
            return;
        }

        for (let j = 0; j < cur_subject.schedules.length; j++) {
            const cur_schedules = cur_subject.schedules[j];
            if (!cur_schedules || !Array.isArray(cur_schedules.times)) continue;

            let hours = cur_schedules.times.length;

            if (hours >= 3) {
            const day1 = cur_schedules.times[0].day;
            const day2 = cur_schedules.times[2].day;
            const time1 = check(cur_schedules, 0);
            const time2 = check(cur_schedules, 2);

            if (is_safe(timetable, day1, day2, time1, time2)) {
                timetable[day1][time1] = [cur_schedules.slot, cur_subject.code, 2];
                timetable[day2][time2] = [cur_schedules.slot, cur_subject.code, hours === 3 ? 1 : 2];

                backtrack(results, size, cur_ind + 1, score + cur_subject.credits, timetable);

                timetable[day1][time1] = "empty";
                timetable[day2][time2] = "empty";
            }
            } else {
            const day1 = cur_schedules.times[0].day;
            const time1 = check(cur_schedules, 0);

            if (is_safe(timetable, day1, "None", time1, -1)) {
                timetable[day1][time1] = [cur_schedules.slot, cur_subject.code, 2];

                backtrack(results, size, cur_ind + 1, score + cur_subject.credits, timetable);

                timetable[day1][time1] = "empty";
            }
            }
        }

        // skip this subject
        backtrack(results, size, cur_ind + 1, score, timetable);
    }

    backtrack(results, results.length, 0, 0, table);
    return { timetable: final_res, score: final_score };
};
