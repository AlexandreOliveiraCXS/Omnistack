import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleCreate(e){
        e.preventDefault();
        const data = {
            title, 
            description, 
            value            
        };
        
        try{
            const response = await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            });
            alert(`Caso Criado com sucesso: ${data.title}`);
            history.push('/profile');
        }catch(err){
            alert("Erro no cadastro")
        }
    }
    
    return(
       <div className="newincident-container">
          <div className="content">
            <section>
                <img src={logoImg} alt="Be The Heroes"/>

                <h1>Cadastro Novo Caso</h1>
                <p>Muito texte aqui Muito texte aqui Muito texte aqui Muito texte aqui Muito texte aqui Muito texte aqui Muito texte aqui Muito texte aqui.</p>
                
                <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Volta para Home
                </Link>
            </section>

            <form onSubmit={handleCreate}>
                <input 
                    placeholder="Título do Caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
               
                <button className="button" type = "submit">Cadastrar</button>
            </form>
          </div>
       </div> 
    );
}