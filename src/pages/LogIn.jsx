import React, { useState,useEffect } from 'react'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer ,toast } from 'react-toastify';

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login ,user} = useAuth();
  const navigate = useNavigate();

  console.log(user,'------------->>>>login page');
  // const [user, setUser] = useState([])

useEffect(()=>{
  if(user)
  navigate("/");
})


  const handleLogin = (e) =>{
    
    e.preventDefault();

    console.log("handleLogin called");
    console.log("username:", userName);
    console.log("password:", password);

    login(userName, password);
    
  };

 
  // const [login, setLogin] = useState(false);

// useEffect(()=>{
//     axios.get('https://fakestoreapi.com/users')
//   .then(response => setUser(response.data));
 
  
//   }, []);

//   const addUser = (e)=>{
//     e.preventDefault();

//     const user={
//       username: userName,
//       password: password,
//     }
//     console.log("Sending user:",user);
  

//  axios
//     .post("https://fakestoreapi.com/users", user)
//     .then((response) => {
//       console.log("API response:", response.data);

//       if (response.data) {
//         toast.success("User Added Successfully");
       
//         setPassword("");
//   setUserName("");

//         console.log("User ID:", response.data.id);
//       console.log("Username I sent:", user.username);
//       console.log("Password I sent:", user.password);  
//         }
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//       toast.error("Failed to add user");
//     });

//   }

  
  return (
    <div className="login-page">
      <form className="login-form"  >

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
          onChange={(e) => setUserName(e.target.value)}
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={userName}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary"  onClick={handleLogin}>
          Login
        </button>

      </form>
    </div>
  )
}

export default LogIn