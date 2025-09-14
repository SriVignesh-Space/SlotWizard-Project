import React, { useContext } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router';

import ThemeProvider,{ThemeContext} from './Elements/ThemeProvider';
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Particles from './Elements/Particles';
import ErrorEl from './pages/ErrorEl'
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import Timetable from './pages/TimeTable'

const router = createBrowserRouter([
  {
    path : "/",
    element : <LandingPage/>,
    errorElement : <ErrorEl />
  },
  {
    path : "/login",
    element : <LoginPage />
  },
  {
    path : "/signup",
    element : <SignUpPage />
  },
  {
    path : "/main",
    element : <MainPage />
  },
  {
    path : "/profile",
    element : <ProfilePage />
  },
  {
    path : "/LogoutPage",
    element : <LogoutPage />
  },
  {
    path: "/timetable",
    element : <Timetable/>
  }
])

const App = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  )
}

const Main = () => {
  
  const {IsDark} = useContext(ThemeContext);

  const color = (IsDark)? '#fff' : '#000';

  console.log(color)

  return (
      <div className={IsDark ? 'dark' : ''}>
        {console.log(IsDark,"rerenders")}
      <div className='hidden sm:block'>
      <div className='pointer-events-none' style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <Particles  
          key={IsDark ? "dark" : "light"}
          particleColors={[color, color]}
          particleCount={400}
          particleSpread={20}
          speed={0.075}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <RouterProvider router={router}></RouterProvider>
    </div>
      </div>
  );
}

export default App;