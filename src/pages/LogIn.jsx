import React, { useState,useEffect } from 'react'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer ,toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login ,user} = useAuth();
  const navigate = useNavigate();

  console.log(user,'------------->>>>login page');
  // const [user, setUser] = useState([])

useEffect(()=>{
  if(user)
  navigate("/product");
})


const handleLogin = (e) => {
  e.preventDefault();

  const newErrors = {};

  // Email validation
  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
  }

  // Password validation
  if (!password.trim()) {
    newErrors.password = "Enter Your Password ";
  } 

  setErrors(newErrors);

  // Stop login if validation fails
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  login(email, password);
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
    <>
    <Navbar />
    <div className="login-page">
      
      <form className="login-form"  >

     <div className="mb-3">
  <label htmlFor="email" className="form-label">
    Email
  </label>

  <input
    onChange={(e) => {
      setEmail(e.target.value);
      setErrors((prev) => ({ ...prev, email: "" }));
    }}
    type="email"
    className="form-control"
    id="email"
    placeholder="Enter your email"
    value={email}
  />

  {errors.email && (
    <small className="validation-error">
      {errors.email}
    </small>
  )}
</div>

        <div className="mb-3">
  <label htmlFor="password" className="form-label">
    Password
  </label>

  <input
    onChange={(e) => {
      setPassword(e.target.value);
      setErrors((prev) => ({ ...prev, password: "" }));
    }}
    value={password}
    type="password"
    className="form-control"
    id="password"
    placeholder="Enter your password"
  />

  {errors.password && (
    <small className="validation-error">
      {errors.password}
    </small>
  )}
</div>

        <button type="submit" className="btn btn-primary"  onClick={handleLogin}>
          Login
        </button>

      </form>
    </div>

  </>
  )
}

export default LogIn