  import React, { useState } from 'react';
  import { useAuth } from '../context/auth';
  import { useNavigate,NavLink} from 'react-router-dom';


  const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // const [activeMenu, setActiveMenu] = useState("Home");
    const { logout, user } = useAuth();
    const navigate = useNavigate();


   

    const handleLogout = (e) =>{
      e.preventDefault();
      logout();
      

    }
    const handleLogin = (e)=>{
      e.preventDefault();
      navigate("/login");

    }

    // const handleMenuClick = (menu, path)=>{
    //   setActiveMenu(menu);
    //   setMenuOpen(false);
    //   navigate(path);

    // }

    return (
       <div className="navbar">

      <div className="image">
        <img src="/images/logo-logomark.png" alt="Logo" />
      </div>

      <div className="menu-items">

        <div className={`right-section ${menuOpen ? 'active' : ''}`}>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `item ${isActive ? 'active-item' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `item ${isActive ? 'active-item' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `item ${isActive ? 'active-item' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>

        </div>

        <div className="profile">

          <div>
            <img src="/images/demo-user.jpg" alt="User" />
          </div>

          <div>
            <button onClick={!user ? handleLogin : handleLogout }>
              {!user ? 'LOGIN' : 'LOGOUT'}
            </button>
          </div>

        </div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
    );
  };

  export default Navbar;