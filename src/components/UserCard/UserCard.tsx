import { useAuthStore } from "../../zustand/authStorage";
import { SelectedUser } from "../../zustand/interface";

interface UserCardProps {
    id: string
    name: string;
    img: string;
    phone: string;
    role: string;
    email: string
    selectUser: (user: SelectedUser) => void;
    
}

export const UserCard = ({ name, img, phone, role, email, selectUser, id }: UserCardProps) => {

    const {user}= useAuthStore()

    //Establecer en un estado el usuario seleccionado
    const handleSelectUser= (id: string, name: string, email: string, phone: string) => {
        selectUser({ id, name, email, phone })
    }

    return (
        <div className='mt-3'>
            <div className="card border-0 shadow " style={{ width: "18rem"}}>
                <img src={img} className="card-img-top w-100 object-fit-contain border-bottom border-2 border-primary shadow p-2" style={{height:'200px'}} alt="..." />
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item fs-5 text-center">{role}</li>
                        <li className="list-group-item fw-bold text-center">{name}</li>
                        <li className="list-group-item text-center">{phone}</li>
                        <li className="list-group-item text-center">{email}</li>
                    </ul>
                    {
                        user?.role === 'Admin' &&
                        
                    <div className='d-flex justify-content-end gap-1 mt-2' > 
                        <button
                           className='btn btn-danger'
                            data-bs-toggle="modal"
                            data-bs-target="#ModalDelete"
                            data-bs-whatever="@mdo"
                            onClick={() => handleSelectUser(id, name, email, phone)}
                        >Borrar</button>
                        <button type="button"
                            className="btn btn-primary text-white"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"
                            onClick={() => handleSelectUser(id, name, email, phone)}
                        >Editar</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}