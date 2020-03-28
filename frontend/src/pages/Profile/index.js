import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';

import './styles.css';
import api from '../../services/api'

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();
    
    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response=>{
            setIncidents(response.data)
        })
    },[ongId]);
    
    async function handleDeleteIncident(id){
        console.log ("aqui")
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            });
            
        } catch (err) {
            alert("Erro ao deletar");
        }
        setIncidents(incidents.filter(incidents => incidents.id !== id));
    }
    
function handleLogout(){
    localStorage.clear();

    history.push('/');
}

    return(

       <div className="porfile-container">
           <header>
                <img src={logoImg} alt="Be The Hero"/> 
                <span>Bem vindo, {ongName}</span>
                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
           </header>

           <h1>Casos Cadastrados</h1>
           <ul>
               { incidents.map(incidents=>(
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>
                
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.description}</p>
                
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style:'currency', currency:'BRL'
                        }).format(incidents.value)}</p>
                
                        <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                             <FiTrash2 size = {20} color="#a8a8b3"/>
                        </button>
                    </li>
                   ))
               }
           </ul>
       </div>
    );
}