import React from 'react'
import { Link } from 'react-router'

const Navbar = ({login = false,profile=false}) => {

  return (
    <div className="flex justify-center">
      <div className="h-20 w-screen flex place-content-between bg-white/10 backdrop-blur-sm border border-white/10 items-center shadow-2xl/20 ">
        <Link to={"/"}>
          <div className="text-4xl ml-4 inline-block p-6 font-bold dark:text-white">
            <span className="bg-dark text-primary dark:text-dark dark:bg-white p-1 rounded-xl">
              Slot
            </span>
            -Wizard
          </div>
        </Link>
        {!login && (
          <Link to={"/login"}>
            <button className="btn cursor-cell dark:bg-white dark:text-dark my-8 mx-10 px-4 font-bold">
              Login
            </button>
          </Link>
        )}
        {profile && (
          <div>
              <Link to={"/profile"}>
                <button className="btn cursor-cell dark:bg-white dark:text-dark my-8  px-4 font-bold">
                  Profile
                </button>
              </Link>
              <Link to={"/logout"}>
                <button className="btn cursor-cell dark:bg-white dark:text-dark my-8 mx-5 px-4 font-bold">
                  Logout
                </button>
              </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar