import { createContext } from "react";
import useTheme from "../hooks/useTheme";

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    // red-theme, default, 
    const [theme, setTheme] =  useTheme("theme", " ")



    return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
    )
}