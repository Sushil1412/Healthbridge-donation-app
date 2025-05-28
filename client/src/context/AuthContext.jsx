// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for stored authentication data when app loads
        const token = localStorage.getItem('userToken');
        const role = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        if (token && role && userId) {
            setCurrentUser({ token, role, userId });
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem('userToken', userData.token);
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userId', userData._id);
        setCurrentUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        setCurrentUser(null);
        navigate('/login');
    };

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}