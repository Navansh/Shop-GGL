import React from 'react'
import GoogleLogo from '../assets/GoogleLogo.svg'
import './styles.css'

function Navbar() {
  return (
    <div className='navbar'>
        <img src={GoogleLogo} alt="GoogleLogo" />
        <h3>Pixel Sales Dashboard</h3> 
        {/* <span> &gt; US</span> */}
    </div>
  )
}

export default Navbar