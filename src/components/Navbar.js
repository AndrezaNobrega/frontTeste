import { NavLink } from "react-router-dom"

import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                <span>Tech</span> Shopping
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink className={({isActive}) => (isActive ? styles.active : '')} to="/login">Login</NavLink>                    
                </li>
                <li>
                    <NavLink className={({isActive}) => (isActive ? styles.active : '')}  to="/cadastro">Cadastro</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => (isActive ? styles.active : '')}  to="/tabela">Produtos</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => (isActive ? styles.active : '')}  to="/perfil">Perfil</NavLink>
                </li>
            </ul>
        </nav>
    )   
}

export default Navbar