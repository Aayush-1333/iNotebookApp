import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import { useState } from 'react';
import NoteForm from './components/NoteForm';


function App() {
  const [style, setStyle] = useState({
    mode: 'light',
    btnName: String.fromCharCode(9789) + ' Dark mode'
  })
  
  const toggleStyle = () => {
    if(style.mode === 'light') {
      setStyle({
        mode: 'dark',
        btnName: String.fromCharCode(9788) + ' Light mode'
    })

    document.body.style.backgroundColor = '#373434'

    }

    else {
      setStyle({
        mode: 'light',
        btnName: String.fromCharCode(9789) + ' Dark mode'
      })

      document.body.style.backgroundColor = 'white'

    }
  }

  return (
    <div className="App">
      <Router>
        <Navbar mode={style.mode} />
        <div className="dark-btn-holder">
          <button className='dark-mode-btn' onClick={toggleStyle}>{style.btnName}</button>
        </div>
        <Routes>
          <Route path='/' element={<Home mode={style.mode} />} />
          <Route path='/create-note' element={<NoteForm mode={style.mode} />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
