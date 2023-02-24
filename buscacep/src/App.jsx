import './App.css'
// import { FiSearch } from 'react-icons/fi'
import { useState } from 'react';
import api from './services/api'


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function buscarCep() {

    if (input === '') {
      alert('Insira algum Cep!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      // console.log(response.data)
      setCep(response.data)
      setInput('')
    } catch {
      alert('Erro ao buscar o cep informado!')
      setInput('')
    }

  }

  return (


    <div className='containerCep'>
      <div>

        <h1>Buscar Cep</h1>

        <div className='input-cep'>
          <input type="text" placeholder="Digite o cep..." onChange={(e) => setInput(e.target.value)} value={input} />

          <button onClick={buscarCep} className='btn-cep'> Buscar  </button>
        </div>

        {Object.keys(cep).length > 0 && ( // Se tiver alguma coisa dentro do nosso objeto, ai rendereiza o que estver dentro da condição, que no caso é o nosso main.
          <main className="buscarcep">
            <h1>CEP: {cep.cep}</h1>

            <span>Rua: {cep.logradouro} </span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade}</span>
            <span>Estado: {cep.uf}</span>
          </main>
        )}


      </div>
    </div>
  );
}

export default App;
