import { createContext, useContext, useState, ReactNode } from "react";


interface StateContextType {
    user: Record<string, null>; 
    token: string | null;
    notification: string;
    setUser: (user: Record<string, null>) => void;
    setToken: (token: string | null) => void;
    setNotification: (message: string) => void;
}


const StateContext = createContext<StateContextType>({
    user: {},
    token: null,
    notification: "",
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<Record<string, null>>({});
    const [token, _setToken] = useState<string | null>(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState<string>("");

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setNotification = (message: string) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider value={{ user, setUser, token, setToken, notification, setNotification }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
