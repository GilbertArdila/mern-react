import { FaUserPlus } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { UseUser } from "../context/context";


const Nav = () => {
    const { user, exit } = UseUser();

    const alignIcon = {
        justifyContent: "center !important",
        alignItems: "center !important",

    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container">
                <NavLink to={'/'} className="navbar-brand" onClick={() => exit()}>Home</NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarNav" data-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!user.name ?
                            <li className="nav-item" >
                                <NavLink className="nav-link " style={alignIcon} to={"/register"}>
                                    <FaUserPlus />
                                    <span> Registrarse</span>
                                </NavLink>
                            </li>
                            :
                            <>
                                {user.role === "superAdmin" ? (
                                    <>
                                        <li className="nav-item" >
                                            <NavLink className="nav-link " style={alignIcon} to={"/allUsers"}>
                                                <RiUserSearchLine />
                                                <span> ver usuarios</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" style={alignIcon} to={"/allEmployees"}>
                                                <FaUser />
                                                <span> Bienvenido {user.name}</span>
                                            </NavLink>
                                        </li></>
                                ) :
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" style={alignIcon} to={"/employees"}>
                                                <FaUser />
                                                <span> Bienvenido {user.name}</span>
                                            </NavLink>
                                        </li>
                                    </>
                                }

                                <li className="nav-item">
                                    <NavLink className="nav-link" style={alignIcon} to={"/"} onClick={() => exit()}>
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