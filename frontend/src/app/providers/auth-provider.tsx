import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    signIn: (username: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
    
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    
    function signIn(username:string, password: string) {
        if(username === 'admin' && password === 'admin') {
            setAuthenticated(true);
            return true;
        }

        return false
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    
    const ctx = useContext(AuthContext);
    
    if(ctx === undefined) throw new Error('useAuth must be used inside AuthProvider');

}