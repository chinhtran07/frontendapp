import { createContext, useContext, useReducer } from "react"
import authReducer from "../reducers/authReducer";

const initialState = {
    user: null,
    accessToken: null,
}


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => useContext(AuthContext)
