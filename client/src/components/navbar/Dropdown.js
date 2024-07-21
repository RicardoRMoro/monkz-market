import {Link} from "react-router-dom"
import { useState} from "react"
import { signOut } from '../auth'

export default function Dropdown({ setUser }) {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return(
        <>
            <ul onClick={handleClick}
            className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
                <li>
                    <Link className="dropdown-link" to="/profile" onClick={() => setClick(false)}>
                     Perfil
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to="/inventory" onClick={() => setClick(false)}>
                     Inventário
                    </Link>
                </li>
                <li>
                    <div className="dropdown-link" onClick={() => signOut(setUser)}>
                     Sair
                    </div>
                </li>
            </ul>
        </>
    )
}