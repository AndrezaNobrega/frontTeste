import {useState, useEffect} from 'react'
import axios from 'axios'

const Cupons = () => {
    const [lista, setLista] = useState([]);
    const url = 'http://localhost:3001/cupons';

    async function carregaDados(){
        await axios.get(url).
        then(response => setLista(response.data),
        console.log(lista))
    }

    useEffect(() => {
        carregaDados()
    }, [])

    console.log('lista', lista)

    return ( lista.map(result => <li key = { result.id }> { result.nome } </li>)
    )
}

export default Cupons