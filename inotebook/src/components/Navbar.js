import React, { useContext } from 'react'
import NoteContext from '../context/notes/NotesContext';

export default function Navbar(props) {

  const { theme, toggleTheme } = useContext(NoteContext);

  let navbarStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    btnBgColor: theme.backgroundImage
  }

  let menuBtnStyle = {
    background: theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
      'linear-gradient(145deg, green, lightgreen)'
  }

  return (
    <div className='fbox navbar' style={navbarStyle}>
      <div className='fbox brand alignItems-center'>
        <img className='brand-image' src="" alt="" width={32} height={32} />
        <span className='nav-brand'><h1>iNotebook</h1></span>
      </div>

      <button className='note-box-btn menu-btn notes' style={menuBtnStyle} type='button' onClick={props.sidebaropen}>Menu</button>

      <div className='fbox btn-holder'>
        <button className='theme-btn notes' type='button' style={menuBtnStyle} onClick={toggleTheme}>{theme.btnName}</button>
      </div>
    </div>
  )
}
