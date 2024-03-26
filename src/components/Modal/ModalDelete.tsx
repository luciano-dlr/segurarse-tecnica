import { useUserStore } from "../../zustand/userStorage";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

interface ModalDeleteProps {
    getUserList: () => void;
}

export const ModalDelete = ({ getUserList }: ModalDeleteProps) => {
    
    const { selectedUser } = useUserStore()
    const collectionRef = collection(db, "Users")

    const handleClick = async () => {
        const userDocRef = doc(collectionRef, selectedUser?.id);
        await deleteDoc(userDocRef)

            .then(() => {
                getUserList()
                toast("Usuario Eliminado")

            })
            .catch(() => {
                toast("No se pudo Eliminar")
            })
    }

    return (
        <div className="modal fade" id="ModalDelete" tabIndex={-1} aria-labelledby="ModalDelete" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <h3>Estas seguro que deseas eliminar este usuario?</h3>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => handleClick()} className="btn btn-primary" data-bs-dismiss="modal">Confirmar</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


