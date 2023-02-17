import React from 'react'

import styles from "./Configuracoes.module.css"
import axios from 'axios'
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


const Configuracoes = () => {
    const [mostrar, setMostrar] = useState("Cores");
    const [lista, setLista] = useState([]);

    const {theme, setTheme}= useContext(ThemeContext)

    

    //fazer o uploads
    const [image, setImage] = useState("")

    const [nomeCupom, setNomeCupom] = useState("")
    const [validadeCupom, setValidadeCupom] = useState("")


    //mensagem de erro e sucesso
    const [formError, setFormError] = useState("") 
    const [successMessage, setSuccessMessage] = useState("");
    


    const url = 'http://localhost:3001/banners';

    async function carregaDados(){
        await axios.get(url).
        then(response => setLista(response.data),
        console.log(lista))
    }

    useEffect(() => {
        carregaDados()
    }, [])



    function deleteBanner(BannerId) {
      fetch(`http://localhost:3001/banners/${BannerId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw setFormError('Problemas na rede');
        }
        return response.json();
      })
      .then(data => {
        setSuccessMessage("Banner deletado com sucesso");
        carregaDados()
      })
      .catch(error => {
        setFormError('Houve um problema', error);
      });

    }



    const handleSubmitBanner = (event) => {
      event.preventDefault();
      setFormError("")

      //validar a url da img
      try {
          new URL(image)
      } catch (error) {
          setFormError("A imagem precisa ser uma URL.")            
      }

      fetch('http://localhost:3001/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image})
      })
        .then((response) => response.json())
        .then((data) => setSuccessMessage("Banner enviado com sucesso"))
        .catch((error) => setFormError(error));
    };

    const handleSubmitCupom = (event) => {
      event.preventDefault();
      setFormError("")

      fetch('http://localhost:3001/cupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome:nomeCupom,
        validade: validadeCupom})
      })
        .then((response) => response.json())
        .then((data) => setSuccessMessage("Cupom cadastrado com sucesso"))
        .catch((error) => setFormError(error));
    };


    return <div className={styles.telaCores}>
           <div className={styles.lateral}>
          <lu>
            <li>
              <a 
              className={(mostrar =="Cores" ? "activePerfil" : '')}
              onClick={() => setMostrar("Cores")}>Cores</a>
            </li>
            <li>
              <a
              className={(mostrar =="BannerEnvio" ? "activePerfil" : '')}
              onClick={() => setMostrar("BannerEnvio")}>Enviar banners
              </a>
            </li>
            <li>
              <a
              className={(mostrar =="BannerGerenciar" ? "activePerfil" : '')}
              onClick={() => setMostrar("BannerGerenciar")}>Gerenciar banners
              </a>
            </li>
            <li>
              <a 
              className={(mostrar =="Descontos" ? "activePerfil" : '')}
              onClick={() => setMostrar("Descontos")}>Descontos</a>
            </li>            
          </lu>
        </div>
            <div className={styles.principal}>

                {mostrar == "Cores" && (
                    <>
                        <h1 className={styles.cores}>Configurações de cor do Ecommerce</h1>
                        <p>O tema atual é: {theme === '' ? 'Blue-theme' : theme}</p>  
                        <p>Escolha a cor de destaque do site:</p>
                        <div className={styles.themeOptions}>
                        <div className={styles.blue} onClick={() => setTheme('')}/> 
                        <div className={styles.green} onClick={() => setTheme('green-theme')}/> 
                        <div className={styles.red} onClick={() => setTheme('red-theme')}/>
                        </div>                   
                    </>
                )}

                {mostrar == "BannerEnvio" && (
                  <form onSubmit={handleSubmitBanner}>
                    <div>
                        <h1 className={styles.cores}>Envie mais um banner a loja</h1>    
                        <label>
                        <span>URL da imagem</span>
                        <input 
                        type="text" 
                        name="imagem" 
                        required 
                        placeholder="Coloque o link da sua foto aqui"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                      />
                      </label>
                        {image && (
                            <img src={image} alt="uploaded file"/>
                        )}                                        
                    </div>
                    <button className="btn1">Enviar</button>
                    {formError && <p className="error">{formError}</p>}
                    {successMessage && <p className='sucess'>{successMessage}</p>}
                  </form>
                )}

                {mostrar == "BannerGerenciar" && (
                    <>                        
                        <h1 className={styles.cores}>Gerencie seus banners</h1>
                        <div className={styles.banner_header}> 
                        <span>Imagem</span>                                 
                        </div>
                        {lista && lista.map((result) => <div key={result.id} className={styles.banner_row}>
                            <p><img className={styles.previaBanner} src={result.image} alt="banner"/></p>                    
                            <div> 
                            <button onClick={() => {

                              if(window.confirm('Deseja mesmo excluir o banner?')) 
                                deleteBanner(result.id)
                                console.log('deletar')
                                }} className='btn btn-outline'>Excluir</button>
                            </div>
                            </div>)}   

                      {formError && <p className="error">{formError}</p>}
                      {successMessage && <p className='sucess'>{successMessage}</p>}                                      
                    </>                    
                )} 

                {mostrar == "Descontos" && (
                    <>          
                        <form onSubmit={handleSubmitCupom}>
                          <div>
                        <h1 className={styles.cores}>Gerencie os descontos</h1>    
                        <label>
                        <span>Nome do Cupom</span>
                        <input 
                        type="text" 
                        name="nome" 
                        required 
                        onChange={(e) => setNomeCupom(e.target.value)}
                        value={nomeCupom}
                      />
                      </label> 
                      <label>
                        <span>Validade do cupom</span>
                        <input 
                        type="text" 
                        name="validade" 
                        required 
                        onChange={(e) => setValidadeCupom(e.target.value)}
                        value={validadeCupom}
                      />
                      </label>                                   
                      </div>
                    <button className="btn1">Cadastrar</button>
                    {formError && <p className="error">{formError}</p>}
                    {successMessage && <p className='sucess'>{successMessage}</p>}
                  </form>
                                         
                    </>
                )} 
        </div>        
    </div>
}

export default Configuracoes