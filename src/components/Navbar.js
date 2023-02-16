import { NavLink } from "react-router-dom"

import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={'brand'}>
                <span>Tech</span> Shopping
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')} to="/login">Login</NavLink>                    
                </li>
                <li>
                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/cadastro">Cadastro</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/tabela">Produtos</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/categorias">Categorias</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => (isActive ? 'activel' : '')}  to="/perfil">Perfil</NavLink>
                </li>
            </ul>
        </nav>
    )   
}

export default Navbar