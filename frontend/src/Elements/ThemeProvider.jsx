/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

 const ThemeProvider = ({ children }) => {

  const [IsDark,setIsDark] = useState(false)

  return <ThemeContext.Provider value={{IsDark : IsDark, setIsDark : setIsDark}}>
    {children}
    </ThemeContext.Provider>;
};

export default ThemeProvider
