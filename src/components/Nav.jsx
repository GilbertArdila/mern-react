import { FaUserPlus } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { UseUser } from "../context/context";


const Nav = () => {
    const { user,exit } = UseUser();

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container">
                <NavLink to={'/'} className="navbar-brand">Home</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarNav" data-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!user.name ?
                            <li className="nav-item">
                                <NavLink className="nav-link " to={"/register"}>
                                    <FaUserPlus />
                                    <span> Registrarse</span>
                                </NavLink>
                            </li>
                            :
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/employees"}>
                                        <FaUser />
                                        <span> Bienvenido {user.name}</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/"} onClick={() => exit()}>
                                        <FaUserTimes />
                                        <span> salir</span>
                                    </NavLink>
                                </li>
                            </>
                        }




                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;