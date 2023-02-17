import { createContext } from "react";
import useauth from "../hooks/useAuth";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // red-theme, default, 
    const [auth, setAuth] =  useauth("auth", " ")



    return (
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
    )
}