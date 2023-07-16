import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

  let navStyle = {
    backgroundColor: props.mode === 'light' ? '#efefef' : '#242424',
    color: props.mode === 'light' ? 'black' : 'white'
  }

  return (
    <div className='container'>
      <div className='navbar' style={navStyle}>
        <h2 className='navbar-brand'>iNotebook</h2>
        <Link className='nav-link' to={'/'} style={navStyle}><span className='hoverText'>Home</span></Link>
        <Link className='nav-link' to={'/create-note'} style={navStyle}><span className='hoverText'>Create a Note</span></Link>
        <Link className='nav-link' to={'/'} style={navStyle}><span className='hoverText'>Help and Support</span></Link>
      </div>
    </div>
  )
}
