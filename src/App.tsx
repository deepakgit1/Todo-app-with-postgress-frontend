import './App.css';
import Login from './component/authentication/Login';
import Home from './component/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from './component/authentication/SignUp';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
