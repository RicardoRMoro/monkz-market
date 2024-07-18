import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import Dropdown from './Dropdown'
import axios from "axios"
import logo from '../../imgs/logo.png'

export default function Navbar() {
    
    const [user, setUser] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:5000/api/me', { withCredentials: true })
            .then(response => {
                setUser(response.data)
            })
            .catch(() => {
                setUser(null)
            })
    }, [])

    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
            .then(() => {
                setUser(null)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const [click, setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const onMouseEnter = () => {
        if(window.innerWidth <960) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    }

    const onMouseLeave = () => {
        if(window.innerWidth <960) {
            setDropdown(false)
        } else {
            setDropdown(false)
        }
    }


    return (
        <>
            <nav className="navbar">
                <Link to='/' className="navbar-logo">
                    <img src={logo} alt="BodeSkinsLogo" className="Logo"/>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                        Início
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/listagem' className="nav-links" onClick={closeMobileMenu}>
                        Anúncios
                        </Link>
                    </li>
                    {user? (
                            <> 
                            <li 
                            className="nav-item" 
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            >
                                <div className="nav-links">
                                    <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                                    <span className="user-name">{user.personaname}</span>
                                </div>
                                {dropdown && <Dropdown />}
                            </li>
                            {/* <li className="nav-item">
                                <Link to='/profile' className="nav-links" onClick={closeMobileMenu}>
                                    Perfil
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/inventory' className="nav-links" onClick={closeMobileMenu}>
                                    Inventário
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <button className="LogoutButton" onClick={handleLogout}>
                                    Sair
                                </button>
                            </li>
                        </>
                    ) : (
                            <li className="nav-item">
                                <button className="LoginButton" onClick={() => window.location.href = "http://localhost:5000/api/v1/auth/steam"}>
                                    <i class="fa-brands fa-steam" aria-hidden="true"></i>
                                    <span className="LoginButton__Text">Entrar</span>
                                </button>
                            </li>
                    )}
                </ul>
                
            </nav>
        </>
    )
}
