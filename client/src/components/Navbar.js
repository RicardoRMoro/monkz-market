import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

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

return <nav className="nav">
    <Link to="/" className="site-title">BODESKINS</Link>
    <ul>
        <CustomLink to="/listagem">Anúncios</CustomLink>
        <CustomLink to="/inventory">Inventário</CustomLink>
        <CustomLink to="/profile">Perfil</CustomLink>
        {user ? (
                    <div className="bola-user">
                        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                    </div>
                ) : (
                    <li><a className="SteamLogin" href="http://localhost:5000/api/v1/auth/steam">Login</a></li>
                )}
    </ul>
</nav>
}

function CustomLink({to, children, ...props}) {
    const path = window.location.pathname
    return (
        <li className={path === to ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )

}