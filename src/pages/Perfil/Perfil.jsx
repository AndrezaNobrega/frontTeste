import styles from "./Perfil.module.css";
import { useState } from "react";
import { unMask, mask } from 'remask';

//setas
import { CgProfile } from 'react-icons/cg';

//context
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

import Cupons from "../Cupons/Cupons";
import { useEffect } from "react";

import { useFetchWithBody } from "../../hooks/useFetchWithBody";

export const Perfil = () => {
const [mostrar, setMostrar] = useState("Endereço");

//mensagem de erro e sucesso
const [formError, setFormError] = useState("") 
const [successMessage, setSuccessMessage] = useState("");

const {auth, setAuth}= useContext(AuthContext)

//edição formulário 
const [emailUsuario, setEmail] = useState("");
const [telefoneUsuario, setTelefone] = useState("");
const [cepUsuario, setCep] = useState("");
const [estadoUsuario, setEstado] = useState("");
const [bairroUsuario, setBairro] = useState("");
const [cidadeUsuario, setCidade] = useState("");
const [nCasa, setnCasa] = useState("");
const [agencia, setAgencia] = useState("");
const [nConta, setNConta] = useState("");
const [chavePix, setChavePix] = useState("");


const {nomeUsuario, razaoSocial} = auth;



  useEffect(() => {
    if (auth) {
        setEmail(auth.email)
        setTelefone(auth.telefone)      
        setCep(auth.cep)
        setEstado(auth.estado)
        setBairro(auth.bairro)
        setCidade(auth.cidade)
        setnCasa(auth.nCasa)
        setAgencia(auth.agencia)
        setNConta(auth.nConta)
        setChavePix(auth.chavePix)     
    }

}, [auth])

const [fetchUsuario, response, error] = useFetchWithBody(`http://localhost:3001/clientes/${auth.id}`);

  const handleSubmitPessoais = (e) => {
    e.preventDefault();
    setFormError("")
    setSuccessMessage("");
    const body = ({"email":emailUsuario, "telefone": telefoneUsuario})
    fetchUsuario(body);
    if (response){        
      setSuccessMessage("Dados pessoais atualizados com sucesso");
    }else if (error){
      setFormError(error)
    }
  } 

  const handleSubmitEndereco = (e) => {
    e.preventDefault();
    setSuccessMessage("")
    setFormError("")
    const body = ({
      "cep": cepUsuario,
      "estado": estadoUsuario, 
      "bairro": bairroUsuario, 
      "cidade": cidadeUsuario,
      "nCasa": nCasa });
      fetchUsuario(body);
      if (response){
        setSuccessMessage("Endereço atualizado");
      }else if (error){
        setFormError(error)
      }
    } 

  const handleSubmitBanco = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
  
    const body = {"agencia": agencia, "nConta": nConta, "pix": chavePix};
    fetchUsuario(body);
    if (response){
      setSuccessMessage("Dados bancários atualizados com sucesso");
    }else if (error){
      setFormError(error)
    }
  }

  const createOnChangeHandler = (unMask, mask, setState) => ev => {
    const originalValue = unMask(ev.target.value);
    const maskedValue = mask(originalValue);
    setState(maskedValue);
  };
  

  return (
    <>
      <h1 className={styles.titulo}>Meu perfil</h1>
      <div className={styles.perfil}>
        <div className={styles.lateral}>
          <div className={styles.profile}><CgProfile/></div>
          <h4>{nomeUsuario}</h4>
          <h5>{razaoSocial}</h5>
          <lu>
            <li>
              <a 
              className={(mostrar =="Perfil" ? "activePerfil" : '')}
              onClick={() => setMostrar("Perfil")}>Dados pessoais</a>
            </li>
            <li>
              <a
              className={(mostrar =="Endereço" ? "activePerfil" : '')}
              onClick={() => setMostrar("Endereço")}>Endereço
              </a>
            </li>
            <li>
              <a 
              className={(mostrar =="Dados" ? "activePerfil" : '')}
              onClick={() => setMostrar("Dados")}>Dados bancários</a>
            </li>
            <li>
              <a 
              className={(mostrar =="Cupons" ? "activePerfil" : '')}
              onClick={() => setMostrar("Cupons")}>Cupons</a>
            </li>
          </lu>
        </div>

        <div className={styles.principal}>

          {mostrar == "Endereço" && (            
            <form onSubmit={handleSubmitEndereco}>                     
              <label>
                CEP: *
                <input type="text" name="CEP"  
                    value = {cepUsuario}
                    onChange = {createOnChangeHandler(
                      unMask,
                      value => mask(value, ["99999-999"]),
                      setCep
                    )}
                    required/>
              </label>
              <label>
                Cidade: *
                <input type="text" name="Cidade" required
                  onChange={(e) => setCidade(e.target.value)}
                  value = {cidadeUsuario} />
              </label>
              <label>
                Estado: *
                <input type="text" name="Estado" required 
                  onChange={(e) => setEstado(e.target.value)}
                  value = {estadoUsuario} />
              </label>
              <label>
                Número da casa: *
                <input type="number" name="nCasa" required
                  onChange={(e) => setnCasa(e.target.value)}
                  value = {nCasa}/>
              </label>
              <label>
                Bairro: *
                <input type="text" name="Bairro" required
                  onChange={(e) => setBairro(e.target.value)}
                  value = {bairroUsuario}/>
              </label>                    
            <button className="btn btn-outline">Adicionar</button>                     
            {formError && <p className="error">{formError}</p>}
            {successMessage && <p className='sucess'>{successMessage}</p>}
            </form>             
           
          )}

          {mostrar == "Perfil" && (
            <>
            <form onSubmit={handleSubmitPessoais}>
              <label>
                Email:
                <input type="text" name="email" value={emailUsuario}  onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                Telefone:
                <input type="text" name="telefone" 
                    value = {telefoneUsuario}
                    onChange = {createOnChangeHandler(
                      unMask,
                      value => mask(value, ["(99) 9 9999-9999"]),
                      setTelefone
                    )} />
              </label>
              <button className="btn btn-outline">Atualizar</button>
              {formError && <p className="error">{formError}</p>}
              {successMessage && <p className='sucess'>{successMessage}</p>}
            </form>
            </>
          )}

          {mostrar == "Dados" && (
            <>
            <form onSubmit={handleSubmitBanco}>
                <label>
                Agência: *
                <input type="text" name="agencia" required
                   onChange={(e) => setAgencia(e.target.value)}
                   value = {agencia} />
              </label>
              <label>
                Número da conta: *
                <input type="text" name="conta" required
                   onChange={(e) => setNConta(e.target.value)}
                   value = {nConta} />
              </label>
              <label>
                Chave pix: 
                <input type="text" name="pix"
                   onChange={(e) => setChavePix(e.target.value)}
                   value = {chavePix} />
              </label>
              <button className="btn btn-outline">Adicionar</button>
              {formError && <p className="error">{formError}</p>}
              {successMessage && <p className='sucess'>{successMessage}</p>}
            </form>
            </>
          )}
          {mostrar == "Cupons" && (<Cupons/>)}
        </div>
      </div>
    </>
  );
};
