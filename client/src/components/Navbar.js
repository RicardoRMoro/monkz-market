import {Link} from "react-router-dom"

export default function Navbar() {
return <nav className="nav">
    <Link to="/" className="site-title">BRASILSKINS</Link>
    <ul>
        <CustomLink to="/listagem">Anúncios</CustomLink>
        <CustomLink to="/inventory">Inventário</CustomLink>
        <CustomLink to="/profile">Perfil</CustomLink>
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