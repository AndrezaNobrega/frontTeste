import styles from './Cadastro.module.css'
import {useState} from "react"
import { unMask, mask } from 'remask';
import { useNavigate } from 'react-router-dom';

//context
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Cadastro = () => {
    const {auth, setAuth}= useContext(AuthContext)



    const [cpf, setCpf] = useState("");
    const onChangeCPF = ev => {
        const originalCpf = unMask(ev.target.value);
        const maskedCpf = mask(originalCpf, ["999.999.999-99", "99.999.999/9999-9"])
        setCpf(maskedCpf)
    }
    const [telefone, setTelefone] = useState("");
    const onChangeTel = ev => {
        const originalTel = unMask(ev.target.value);
        const maskedTel = mask(originalTel, ["(99) 9 9999-9999 ", "(99) 9999-9999"])
        setTelefone(maskedTel)
    }

    const usenavigate = useNavigate()

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("");

        const user = {
            nomeUsuario,
            razaoSocial,
            cpf,
            telefone,
            email,
            senha,            
        }

        if (senha != confirmaSenha){
            setError("As senhas precisam ser iguais!")
            return
        }

        fetch("http://localhost:3001/clientes", {
            method: "POST",
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(user)
            
        }).then((res) => {    
            setAuth(user)                    
            usenavigate('/')          
            //aqui a gente vai redirecionar pra tela já cadastrado
        }).catch((error) =>{
            setError(error.message)
        })

    }
    return (
        <div className={styles.cadastro}>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <label>Nome:
                <input
                    type= "text"
                    value={nomeUsuario}
                    name="nomeUsuario"
                    required
                    placeholder='Digite seu nome completo'
                    onChange={(e) => setNomeUsuario(e.target.value)}
                />
                </label>
                <label>CPF/CNPJ:
                <input 
                    value = {cpf}
                    onChange = {onChangeCPF}
                    name = "cpf"                    
                    placeholder="Digite o seu CPF ou CNPJ"
                /> 
                </label>                  
                <label>Razão social:
                <input
                    type= "text"
                    name="razaoSocial"                    
                    placeholder='Digite a razão social da sua empresa'
                    value = {razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                />
                </label>
                <label>Email:
                <input                    
                    type= "email"
                    name="email"
                    required
                    placeholder='Digite aqui o seu melhor email'
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </label>
                <label>Telefone:
                <input                    
                    value = {telefone}                    
                    name="telefone"
                    required
                    placeholder='Digite aqui o seu telefone'
                    onChange = {onChangeTel}
                />
                </label>
                <label>Senha:
                <input
                    type= "password"
                    name="senha"
                    required
                    placeholder='Digite sua senha'
                    value = {senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                </label>
                <label>Confirmação da senha:
                <input
                    type= "password"
                    name="senhaConfirmacao"
                    required
                    placeholder='Confirme sua senha'
                    value = {confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                />
                </label>
                <button className='btn1'>Cadastrar</button>
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Cadastro