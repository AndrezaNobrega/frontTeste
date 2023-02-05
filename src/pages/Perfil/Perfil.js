import styles from "./Perfil.module.css";
import profile from "../../profile/user.png";
import { useState } from "react";
import { unMask, mask } from 'remask';

export const Perfil = () => {
  const [mostrar, setMostrar] = useState("Endereço");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");


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
          <img src={profile}></img>
          <h4>Nome</h4>
          <h5>Razao Social</h5>
          <lu>
            <li>
              <a 
              className={(mostrar =="Perfil" ? styles.active : '')}
              onClick={() => setMostrar("Perfil")}>Dados pessoais</a>
            </li>
            <li>
              <a
              className={(mostrar =="Endereço" ? styles.active : '')}
              onClick={() => setMostrar("Endereço")}>Endereço
              </a>
            </li>
            <li>
              <a 
              className={(mostrar =="Dados" ? styles.active : '')}
              onClick={() => setMostrar("Dados")}>Dados bancários</a>
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
                <input type="text" name="email" />
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
        </div>
      </div>
    </>
  );
};
