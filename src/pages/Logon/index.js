import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import Logo from '../../components/logo';

import './styles.css';
import heroesImg from '../../assets/heroes.png';

import { FiLogIn } from 'react-icons/fi';

export default function Logon() {

    const ongId = localStorage.getItem('ongId');
    const [ id, setId ] = useState(ongId);
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            
            const response = await api.post('session', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile');
            
        } catch (error) {
            alert('Falha no logon, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">

                <Logo />

                <form onSubmit={handleLogon}>

                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>

                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>
            
        </div>

    );
};