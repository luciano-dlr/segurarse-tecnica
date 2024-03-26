import { Link } from 'react-router-dom'
import { useAuthStore } from '../../zustand/authStorage'
import Logo from "../../assets/Logo.svg";

interface LayoutProps {
    children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {

    const { user, logOut } = useAuthStore()

    return (
        <div className='overflow-auto'>
            <nav className="navbar bg-primary fixed-top ">
                <div className="container-fluid">
                    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <p className='fs-4 fw-bold text-white pt-2'>{`Bienvenido ${user?.name}`}</p>
                    <Link to={'/userScreen'} >
                        <img src={user?.img} style={{ width: '45px', height: '45px' }} className='object-fit-contain' />
                    </Link>
                    <div className="offcanvas offcanvas-start bg-primary" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close bg-white rounded-circle" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <img src={Logo} className='w-75' />

                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-2">
                                <Link to={'/homeScreen'} className="nav-item">
                                    <button className='btn btn-primary rounded text-white fw-bold rounded-pill col-12 ' data-bs-dismiss="offcanvas">Lista de Usuarios</button>
                                </Link>
                                <li className="nav-item">
                                    <button className='btn btn-primary rounded text-white fw-bold rounded-pill col-12' onClick={logOut} data-bs-dismiss="offcanvas">Log out</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='mt-5'>
                <div className='pt-3 pb-3' >
                    {children}
                </div>
            </div>
        </div>
    )
}


