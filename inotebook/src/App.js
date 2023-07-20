import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Sidebar from './components/Sidebar';
import NoteState from './context/notes/NotesState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {

  const OpenNav = () => {
    let sidebar = document.getElementsByClassName('sidebar')[0];

    sidebar.style.visibility = 'visible';
    sidebar.style.width = '350px';
  }

  const CloseNav = () => {
    let sidebar = document.getElementsByClassName('sidebar')[0];

    sidebar.style.visibility = 'collapse';
    sidebar.style.width = '0px';
  }

  return (
    <div>
      <NoteState>
        <Router>
          <div className='fbox'>

            <Sidebar closenav={CloseNav} />

            <div className='notes' style={{flexGrow: '1'}}>
              <Navbar navopen={OpenNav} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
              </Routes>
            </div>

          </div>

        </Router>
      </NoteState>
    </div>
  );
}

export default App;
