import { useAuthStore } from "../../zustand/authStorage"

export const UserProfileCard = () => {

    const { user } = useAuthStore()

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: '0.5rem' }}>
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}>
                                    <img src={user?.img}
                                        alt="Avatar" className="img-fluid my-5" style={{ width: '80px' }} />
                                    <i className="far fa-edit mb-5"></i>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">

                                        <h6>Infromacion</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Nombre</h6>
                                                <p className="text-muted">{user?.name}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Rol</h6>
                                                <p className="text-muted">{user?.role}</p>
                                            </div>
                                        </div>

                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{user?.email}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Telefono</h6>
                                                <p className="text-muted">{user?.phone}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


