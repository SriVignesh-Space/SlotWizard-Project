# SlotWizard – Streamlined Course Scheduling for Students

SlotWizard is a smart web-based system that automates course enrollment and generates conflict-free timetables for students using an intelligent backtracking algorithm integrated with the MERN stack. It minimizes manual effort, reduces scheduling conflicts, and provides students with personalized, optimized schedules in real time.​

# About

SlotWizard addresses the limitations of traditional ERP and manual scheduling systems, which often fail to handle complex course combinations, faculty preferences, and slot constraints. By combining a customized backtracking-based scheduling engine with a modern MERN-based web interface, it delivers a scalable, cost-effective, and user-centric solution for academic timetable generation and management.​

The system operates in two key phases: smart enrollment (subject and faculty preference selection) and timetable optimization (automatic generation of a clash-free schedule). Students can view, edit, and regenerate their timetable in real time, while the system continually checks for slot clashes, faculty double-booking, and elective group conflicts.​

# Features

1. Automated generation of conflict-free timetables using a customized backtracking algorithm.​

2. Smart subject enrollment with support for core, elective, and faculty preference selection.​

3. Real-time slot clash detection for overlapping slots, lab blocks, duplicate electives, and faculty double-booking.​

4. Personalized timetable management with options to view, edit, and regenerate schedules.​

5. MERN stack architecture (MongoDB, Express.js, React.js, Node.js) for full-stack, scalable web deployment.​

5. Secure authentication using JWT-based login and protected routes for student access.​

6. Interactive UI for enrollment and timetable display using React components and SPA design.​

7. Backend scheduling engine with pruning, slot-order prioritization, and best-timetable selection based on maximum credits/subjects.​

# Requirements

<b>Operating System:</b> Windows 10 / 11, Linux, or macOS (for MERN development and deployment).​

<b>Frontend:</b> React.js (SPA), HTML5, CSS3, JavaScript.​

<b>Backend:</b> Node.js with Express.js for REST APIs and scheduling services.​

<b>Database:</b> MongoDB for storing users, subjects, slots, faculty, and timetable metadata.​

<b>Authentication & Security: </b> JSON Web Tokens (JWT), secure password storage, and access control for protected routes.​

<b>Tools / IDE:</b> Visual Studio Code or equivalent, Git for version control, npm/yarn for dependency management.​

<b>Core Libraries / Dependencies (indicative):</b> 
1. React, React Router, axios, react-hot-toast (frontend).​

2. Express, Mongoose, JSON Web Token, dotenv, cors (backend).​

# System Architecture

The system follows a layered client–server architecture built on the MERN stack. The React frontend handles user interaction (login, subject selection, timetable view), the Express/Node backend hosts REST APIs and the scheduling engine, and MongoDB stores all domain data such as subjects, faculty, slots, and user profiles.​

<b>High-level flow:</b>

Student authenticates and selects subjects with preferred faculty from the Enrollment Panel.​

Selections are sent to the backend, where the backtracking-based timetable generator checks constraints and fills a weekly timetable structure.​

The backend returns the best conflict-free timetable and any missed subjects, which the frontend renders as an interactive weekly grid.​

![Architecture](<C:\Users\Sri Vignesh G\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\TempState\44B6531E58A165C5EF83C4BD99C9F5A5\WhatsApp Image 2025-12-06 at 22.00.19_df7eae42.jpg>)

Output1 – Landing Page

The landing page introduces SlotWizard, highlighting its purpose of generating smarter, clash-free timetables and guiding users to register or log in with a clean, animated interface.​
![landing](<C:\Users\Sri Vignesh G\OneDrive\Pictures\Screenshots\Screenshot 2025-12-06 221314.png>)
![sign](<C:\Users\Sri Vignesh G\OneDrive\Pictures\Screenshots\Screenshot 2025-12-06 221441.png>)

The login page allows registered students to authenticate securely before accessing the dashboard, with validations and error feedback for invalid credentials.​
![login](<C:\Users\Sri Vignesh G\OneDrive\Pictures\Screenshots\Screenshot 2025-12-06 221534.png>)

The Enrollment Panel lets students browse/search all available subjects, add them to a selection list, and choose preferred faculty per subject with corresponding slot details.
![Enrollment](<C:\Users\Sri Vignesh G\OneDrive\Pictures\Screenshots\Screenshot 2025-12-06 221737.png>)​

The Timetable Display Page shows the generated clash-free weekly schedule in a tabular grid with days vs time slots, including subject code, name, faculty, and slot.​
It also lists missed subjects that could not be scheduled and allows navigation between timetable variants (Previous/Next) and options like Edit or New.​The engine is optimized with pruning and slot-order heuristics to provide near-instant timetable generation for typical semester loads.​
![timetable](<C:\Users\Sri Vignesh G\OneDrive\Pictures\Screenshots\Screenshot 2025-12-06 221846.png>)

# Results and Impact

SlotWizard significantly reduces the manual complexity of timetable creation, eliminating common issues like overlapping subjects, duplicate electives, and faculty double-booking. It improves academic planning efficiency by allowing students to experiment with course combinations and instantly visualize the impact on their weekly schedule.​

For institutions, the system demonstrates how intelligent algorithms (backtracking, constraint handling, simple heuristics) combined with modern web technologies can form a robust, scalable academic scheduling platform. This mini-project can be extended into a production-grade solution integrated with institutional ERPs or used as a base for more advanced research in timetable optimization and adaptive scheduling.​

# Articles published / References

Sadeh, N., Sycara, K., Xiong, Y. “Backtracking Techniques for Hard Scheduling Problems,” Carnegie Mellon University, 1992.​

Alagu Lakshmi, S., Sujitha, S., Durga, N. “Time Table Automation System Using Backtracking Technique,” International Journal of Advanced Research in Biology Engineering Science and Technology, 2016.​

Deris, S., Omatu, S., Ohta, H. “Timetable Planning Using Constraint-Based Reasoning,” Computers & Operations Research, 1999/2000.​

Alghamdi, H., Alsubait, T., Alhakami, H., Baz, A. “A Review of Optimization Algorithms for University Timetable Scheduling,” Engineering, Technology & Applied Science Research, 2020.​