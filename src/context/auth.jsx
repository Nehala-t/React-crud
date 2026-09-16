import { createContext, useState,useEffect, useContext } from "react";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";



// Create AuthContext
const AuthContext = createContext();



// Dummy users
// const fakeUsers =[
//     {username: "admin", password: "password"},
//     {username: "user1", password: "1234"},
//     {username: "user2", password: "abcd"},
//     {username: "user3", password: "ABCD"},
// ]

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);


    // Check localStorage when app starts
 // Check localStorage when app starts
useEffect(() => {
  const storedUser = localStorage.getItem("loggedInUser");
  const storedToken = localStorage.getItem("accessToken");

  if (storedUser && storedToken) {
    setUser(JSON.parse(storedUser));
  }

  setAuthLoading(false);
}, []);

  


  // Login using backend

  const login = async (email, password) => {
    try{
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email, 
          password
        }
      );
      console.log("Login response:", response.data);

      if(response.data.success){
        const userData = response.data.data; 
        const token = response.data.accessToken;

        // Save user 
        setUser(userData);

        // Save user in localStorage
        localStorage.setItem( "loggedInUser", JSON.stringify(userData) );

        // Save JWT token 
        localStorage.setItem("accessToken", token);

        toast.success("Login successful 🎉"); 
        console.log("Login successful");
      }
    }
    catch (error) { 
      console.log("Login error:", error); 
      toast.error( error.response?.data?.message || "Invalid email or password" ); }


    // const foundUser = fakeUsers.find((user)=> user.username === username && user.password === password);

    // if(foundUser){
    //     const userData = { username: foundUser.username };
    //     setUser(userData);
    //     localStorage.setItem('loggedInUser',JSON.stringify(userData)); // Save to localStorage
    //     toast.success("Login successful 🎉");
    //     console.log("login");
    // }
    // else{
    //     toast.error("Invalid Credentials!");
    //     console.log("fail");
    // }
  }
  const logout = () =>{
    setUser(null);
    localStorage.removeItem('loggedInUser');  // ✅ Clear localStorage
    localStorage.removeItem("accessToken");
    toast.info("Logged out successfully!")
    
  }



   return (
    <>
    <AuthContext.Provider
  value={{
    user,
    setUser,
    login,
    logout,
    authLoading
  }}
>
    {children}
    </AuthContext.Provider>
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    
    
    </>
 )
}

// Custom hook for using AuthContext
export const  useAuth = ()=> useContext(AuthContext);

