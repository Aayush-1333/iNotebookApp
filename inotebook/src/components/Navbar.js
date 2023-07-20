import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import NoteContext from '../context/notes/NotesContext';

export default function Navbar(props) {

  const style = useContext(NoteContext);

  return (
    <div className='fbox navbar' style={
      {
        backgroundColor: style.theme.backgroundColor,
        color: style.theme.color,
        btnBgColor: style.theme.backgroundImage
      }}>
      <div className='fbox brand alignItems-center'>
        <img className='brand-image' src="" alt="" width={32} height={32} />
        <span className='nav-brand'>iNotebook</span>
      </div>

      <button className='note-box-btn menu-btn notes' style={{
        background: 
        style.theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
        'linear-gradient(145deg, green, lightgreen)'
      }} type='button' onClick={props.navopen}>Menu</button>

      <div className='fbox btn-holder'>
        <button className='theme-btn notes' type='button' style={{
                  background: 
                  style.theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
                  'linear-gradient(145deg, green, lightgreen)'
        }} onClick={style.toggleTheme}>{style.theme.btnName}</button>
      </div>
    </div>
  )
}
