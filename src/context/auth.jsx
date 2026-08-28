import { createContext, useState,useEffect, useContext } from "react";
import { ToastContainer,toast } from "react-toastify";


// Create AuthContext
const AuthContext = createContext();



// Dummy users
const fakeUsers =[
    {username: "admin", password: "password"},
    {username: "user1", password: "1234"},
    {username: "user2", password: "abcd"},
    {username: "user3", password: "ABCD"},
]

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);


    // Check localStorage 
     useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);



  const login = (username, password) => {
    const foundUser = fakeUsers.find((user)=> user.username === username && user.password === password);


    if(foundUser){
        const userData = { username: foundUser.username };
        setUser(userData);
        localStorage.setItem('loggedInUser',JSON.stringify(userData)); // Save to localStorage
        toast.success("Login successful 🎉");
        console.log("login");
    }
    else{
        toast.error("Invalid Credentials!");
        console.log("fail");
    }
  }
  const logout = () =>{
    setUser(null);
    localStorage.removeItem('loggedInUser');  // ✅ Clear localStorage
    toast.info("Logged out successfully!")
    
  }



   return (
    <>
    <AuthContext.Provider value={{user, login, logout}} >
    {children}
    </AuthContext.Provider>
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    
    
    </>
 )
}

// Custom hook for using AuthContext
export const  useAuth = ()=> useContext(AuthContext);

