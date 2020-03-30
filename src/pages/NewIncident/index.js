import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import api from '../../services/api';

import { FiArrowLeft } from "react-icons/fi";

import Logo from '../../components/logo';

import './styles.css';

export default function NewIncident() {

    const [ title, setTitle ] = useState();
    const [ description, setDescription ] = useState();
    const [ value, setValue ] = useState();
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        try {

            const data = {
                title,
                description,
                value
            };

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');

        } catch (error) {
            alert(`erro ao cadastrar novo caso.\n${error.response.data.message}`);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">

                <section>
                    <Logo />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>

                    <input 
                        placeholder="Titulo do caso"
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

                    <button className="button" type="submit">Cadastrar</button>

                </form>

            </div>
        </div>
    );
};