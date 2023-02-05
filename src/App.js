import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//páginas
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import Cupons from './pages/Cupons/Cupons';
import { Perfil } from './pages/Perfil/Perfil';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/>     
            <Route path="/perfil" element={<Perfil/>}/>     
            <Route path="/cupons" element={<Cupons/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
