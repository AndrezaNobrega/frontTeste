import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//páginas
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import { Perfil } from './pages/Perfil/Perfil';
import ProdutosTabela from './pages/Produtos/ProdutosTabela';
import Produto from './pages/Produtos/Produto/Produto';
import Categorias from './pages/Categorias/Categorias';


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
            <Route path="/tabela" element={<ProdutosTabela/>}/>
            <Route path='/produtos/:id' element={<Produto/>}/>
            <Route path='/categorias' element={<Categorias/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
