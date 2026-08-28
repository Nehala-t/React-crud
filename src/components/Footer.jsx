import React from 'react'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='imagecontainer'><img src='/images/logo-logomark.png' alt="" /></div>
      <div className='menu-cont'>
        <Link to="/" className='menu-item-1'>Home</Link>
        <Link to="/about" className='menu-item-1'>About</Link>
        <Link to="/contact" className='menu-item-1'>Contact</Link>
      </div>
      <div className='social-meadia'>
        <Link to="https://www.facebook.com/"><img src="/images/iconoir_facebook.png" alt="" /></Link>
        <Link to="https://x.com/"><img src="/images/basil_twitter-outline.png" alt="" /></Link>
        <Link to="https://www.instagram.com/"><img src="/images/Vector (10).png" alt="" /></Link>
      </div>
      <div><p>© 2025 MyApp. All Rights Reserved.</p></div>

    </div>
  )
}

export default Footer