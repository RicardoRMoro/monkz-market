import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import { signIn, checkUser } from '../auth'
import Dropdown from './Dropdown'
import logo from '../../imgs/logo.png'

export default function Navbar() {
    
    const [user, setUser] = useState(null)
    useEffect(() => {
        checkUser(setUser)
    }, [])



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
                        </>
                    ) : (
                            <li className="nav-item">
                                <button className="LoginButton" onClick={signIn}>
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
