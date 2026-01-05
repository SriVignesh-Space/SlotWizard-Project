import React,{useContext} from 'react'
import { ThemeContext } from '../Elements/ThemeProvider';
import { Link } from 'react-router'
import { MoonIcon, SunIcon } from 'lucide-react';

const Navbar = () => {

  const {IsDark, setIsDark} = useContext(ThemeContext);

  const handleTheme = () => {
    setIsDark((prev) => !prev);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="h-20 w-screen flex place-content-between bg-white/10 backdrop-blur-sm border border-white/10 items-center shadow-2xl/20 ">
        <Link to={"/"}>
          <div className="text-4xl ml-4 inline-block p-6 font-bold dark:text-white">
            <span className="bg-dark text-primary dark:text-dark dark:bg-white p-1 rounded-xl">
              Slot
            </span>
            -Wizard
          </div>
        </Link>
        <div className='flex justify-center items-center my-8 mx-12 gap-3'>
          <div className='bg-dark text-white dark:bg-white p-2 rounded-2xl dark:text-dark' onClick={handleTheme}>
              {(IsDark) ? <MoonIcon /> : <SunIcon /> }
          </div>    
        </div>
      </div>
    </div>
  );
}

export default Navbar