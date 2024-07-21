import '../styles/App.css' 
import '../styles/Profile.css' 
import {  checkUser } from './auth'
import React, { useEffect, useState } from 'react';

export default function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        checkUser(setUser)
    }, [])

    if (!user) {
        return <div>Loading...</div>; // ou outro estado de carregamento/placeholder
    }
    return (
        <div className="profilebg">
            <div className='content'>
                <div className='content-title'>Perfil</div>
                <div className='content-detalhado'>
                    <div className='set-info'>
                        <div className="set-info-header">Configuração Perfil</div>
                        <div className='line'>
                            <span className='line-item-header'>Avatar:</span>
                            <img src={user.avatarfull} alt='Avatar' className='line-item-avatar'/>
                        </div>
                        <div className='line'>
                            <span className='line-item-header'>Usuário:</span>
                            <span className='line-item'>{user.personaname}</span>
                        </div>
                        <div className='line'>
                            <span className='line-item-header'>Email:</span>
                            <div className='outerinput'>
                                <input type="email" placeholder="Seu endereço de email" className="input" autocomplete="email"></input>
                            </div>
                        </div>
                    </div>
                    <div className='set-steam'>
                        <div className="set-info-header">Configuração Steam</div>
                        <div className='line'>
                        </div>
                        <div className='line'>
                        </div>
                        <div className='line'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


