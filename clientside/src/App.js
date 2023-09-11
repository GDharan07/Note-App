import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './Components/Navbar';
import Display from './pages/Display';
import AddNote from './pages/AddNote';
import Errorpage from './pages/Errorpage';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/display' element={<Display></Display>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/addnote' element={<AddNote></AddNote>}></Route>
          <Route path='*' element={<Errorpage></Errorpage>} ></Route>      
        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
