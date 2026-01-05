import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router';

import ThemeProvider,{ThemeContext} from './Elements/ThemeProvider';
import MainPage from './pages/MainPage';
import Particles from './Elements/Particles';
import ErrorEl from './pages/ErrorEl'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorEl />,
  }
])

const App = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

const Main = () => {
  const { IsDark } = useContext(ThemeContext);

  const color = IsDark ? "#fff" : "#000";

  return (
      <div className={IsDark ? 'dark' : ''}>
      <div className='hidden sm:block'>
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0">
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
};

export default App;
