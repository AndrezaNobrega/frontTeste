import styles from "./Perfil.module.css";
import { useState } from "react";
import { unMask, mask } from 'remask';

//setas
import { CgProfile } from 'react-icons/cg';

//context
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";





import Cupons from "../Cupons/Cupons";

export const Perfil = () => {

  const {auth, setAuth}= useContext(AuthContext)
  console.log(auth)
  console.log(auth.nomeUsuario)
  console.log(auth.razaoSocial)
  console.log(auth.cpf, auth.telefone, auth.email)

  const {nomeUsuario, razaoSocial, cpf, telefoneUser, email} = auth;

  console.log(nomeUsuario)



  const [mostrar, setMostrar] = useState("Endereço");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState(telefoneUser);


  const onChangeCep = ev => {
      const originalCep = unMask(ev.target.value);
      const maskedCep = mask(originalCep, ["99999-999"])
      setCep(maskedCep)
  }

  const onChangeTel = ev => {
    const originalTel = unMask(ev.target.value);
    const maskedTel = mask(originalTel, ["(99) 9 9999-9999"])
    setTelefone(maskedTel)
}

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
            <>
            <div className={styles.endereco}>
              <label>
                CEP: *
                <input type="text" name="CEP"  
                    value = {cep}
                    onChange = {onChangeCep} 
                    required/>
              </label>
              <label>
                Cidade: *
                <input type="text" name="Cidade" required />
              </label>
              <label>
                Estado: *
                <input type="text" name="Estado" required />
              </label>
              <label>
                Número da casa: *
                <input type="number" name="Estado" required />
              </label>
              <label>
                Bairro: *
                <input type="text" name="Estado" required/>
              </label>              
            </div>
            <button className="btn btn-outline">Adicionar</button>
            </>
          )}

          {mostrar == "Perfil" && (
            <>
              <label>
                Email:
                <input type="text" name="email" value={email} />
              </label>
              <label>
                Telefone:
                <input type="text" name="telefone" 
                    value = {telefone}
                    onChange = {onChangeTel} />
              </label>
              <button className="btn btn-outline">Atualizar</button>
            </>
          )}
          {mostrar == "Dados" && (
            <>
                <label>
                Agência: *
                <input type="text" name="agencia" required/>
              </label>
              <label>
                Número da conta: *
                <input type="text" name="conta" required />
              </label>
              <label>
                Chave pix: 
                <input type="text" name="pix" />
              </label>
              <button className="btn btn-outline">Adicionar</button>
            </>
          )}
          {mostrar == "Cupons" && (<Cupons/>)}
        </div>
      </div>
    </>
  );
};
