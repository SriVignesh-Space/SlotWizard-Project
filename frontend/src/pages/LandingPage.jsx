import { Link } from "react-router";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className=" ">
    <div className=" dark:bg-dark h-screen dark:text-primary min-h-screen">
      <Navbar />
      <div className="h-5/6 flex items-center justify-center">
        <div className="p-5 bg-white/2 w-2xl backdrop-blur-sm text-center rounded-3xl">
          <h1 className="text-5xl font-bold">
            Build Smarter Timetables, <br />
            Not Harder.,
          </h1>
          <p className="p-5 text-xl/tight opacity-50">
            Choose your preferences, and let our system build the perfect
            timetable for you.
          </p>
          <Link to={'/signup'}>
          <button className="dark:bg-primary dark:text-dark bg-dark text-primary font-bold text-2xl pl-6 pr-6 pt-4 pb-4 rounded-full text-shadow-white inline-block cursor-pointer">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
