import React from 'react'


const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='imagecontainer'><img src='/images/logo-logomark.png' alt="" /></div>
      <div className='menu-cont'>
        <div className='menu-item'>Home</div>
        <div className='menu-item'>About</div>
        <div className='menu-item'>Contact</div>
      </div>
      <div className='social-meadia'>
        <div><img src="/images/iconoir_facebook.png" alt="" /></div>
        <div><img src="/images/basil_twitter-outline.png" alt="" /></div>
        <div><img src="/images/Vector (10).png" alt="" /></div>
      </div>
      <div><p>© 2025 MyApp. All Rights Reserved.</p></div>

    </div>
  )
}

export default Footer