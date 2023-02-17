import { NavLink } from "react-router-dom"

import styles from "./Navbar.module.css"

import { useNavigate } from 'react-router-dom';


//context
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

    const usenavigate = useNavigate()

    function logOut(){
        setAuth('');
        usenavigate('/');
    }


    const {auth, setAuth}= useContext(AuthContext)
    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={'brand'}>
                <span>Tech</span> Shopping
            </NavLink>
            <ul className={styles.links_list}>
                {auth && (
                    <>
                    <li>
                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/tabela">Produtos</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/perfil">Perfil</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/configuracoes">Configurações</NavLink>
                    </li>
                    <li>
                        <button onClick={logOut}>Sair</button>
                    </li>
                    
                    </>
                )}
                {!auth && (
                    <>
                                <li>
                                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')} to="/login">Login</NavLink>                    
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/cadastro">Cadastro</NavLink>
                                </li>
                
                                <li>
                                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/categorias">Categorias</NavLink>
                                </li>
                    </>
                    
                )}

            </ul>
        </nav>
    )   
}

export default Navbar