// Importing states, routing components and webapp components
import UserState from './context/users/UsersState';
import NoteState from './context/notes/NotesState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Sidebar from './components/Sidebar';
import EditNote from './components/EditNote';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';


// Final rendering of the Webapp
function App() {

  // Opens the Sidebar
  const OpenSidebar = () => {
    let sidebar = document.getElementsByClassName('sidebar')[0];

    sidebar.style.visibility = 'visible';
    sidebar.style.width = '400px';
  }

  // Closes the sidebar
  const CloseSidebar = () => {
    let sidebar = document.getElementsByClassName('sidebar')[0];

    sidebar.style.visibility = 'collapse';
    sidebar.style.width = '0px';
  }

  return (
    <div>
      <UserState>
        <NoteState>
          <Router>
            <div className='fbox'>
              <Sidebar sidebarclose={CloseSidebar} />
              <div className='notes' style={{ flexGrow: '1' }}>
                <Navbar sidebaropen={OpenSidebar} />
                <Alert />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/editnote' element={<EditNote />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                </Routes>
              </div>

            </div>

          </Router>
        </NoteState>
      </UserState>
    </div>
  );
}

export default App;
