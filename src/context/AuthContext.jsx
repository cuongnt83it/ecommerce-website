import {createContext,useContext,useState} from 'react'

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        localStorage.getItem('currentUserEmail') 
        ? { email: localStorage.getItem('currentUserEmail') } : null
    );
   
    const signup = (email, password) => {
        // Simulate signup logic
        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        if (users.find(user => user.email === email)) {
            return { success: false, error: 'User already exists' };
        }
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUserEmail',email);
        setUser({ email });
        return { success: true };
    };


    const login = (email, password) => {
        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        const existingUser = users.find(user => user.email === email && user.password === password);
        if (existingUser) {
            localStorage.setItem('currentUserEmail', email);
            setUser({ email });
            return { success: true };
        } else {
            return { success: false, error: 'Invalid email or password' };
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUserEmail');
        setUser(null);
    };


  return (
    <AuthContext.Provider value={{signup, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => {
    const context = useContext(AuthContext);    
    return context;
}

export default AuthProvider;

export { useAuth };
