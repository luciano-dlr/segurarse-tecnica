import { useState, useEffect } from 'react';
import { Layout } from "../../components/Layout/Layout";
import { UserCard } from "../../components/UserCard/UserCard";
import { db } from "../../firebase/firebase";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { User } from '../../zustand/interface';
import { ModalEdit } from '../../components/Modal/ModalEdit';
import { useUserStore } from '../../zustand/userStorage';
import { ToastContainer } from 'react-toastify';
import { ModalDelete } from '../../components/Modal/ModalDelete';
import { ModalCreate } from '../../components/Modal/ModalCreate';
import Plus from "../../assets/Plus.svg";
import { useAuthStore } from '../../zustand/authStorage';


export const HomeScreen = () => {




  // eliminar y editar solo admin, agregar usuario tambien solo admin 



  //Mejorar stetica del proyect

  //validations de mail y telefono en formulario 


  // hacer documentation 


  //subir a github

  const [userList, setUserList] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { selectedUser, setUser, cleanUser } = useUserStore()
  const { user } = useAuthStore()


  const getUsersList = async () => {

    const collectionRef = collection(db, "Users")
    const response = await getDocs(collectionRef)
    const users = response.docs.map((doc: DocumentData) => {

      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setUserList(users)

  }

  const filteredUsers = userList.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getUsersList();
    setSearchTerm('');
  }, [selectedUser])


  return (
    <Layout >

      <div className="container">
        {
          user?.role === 'Admin' &&
          <button
            className='btn btn-primary text-white position-fixed bottom-0 end-0 m-3 rounded-circle fw-bold p-4 d-block d-sm-block d-md-none d-lg-none '
            style={{ zIndex: 5 }}
            data-bs-toggle="modal"
            data-bs-target="#ModalCreate"
            data-bs-whatever="@mdo"
          ><img src={Plus} />
          </button>
        }
        <div className="d-flex flex-column align-items-center justify-content-center  mt-5 ">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label >Buscar</label>
            </div>
          </div>
          {
            user?.role === 'Admin' &&
            <button
              className='btn btn-primary text-white d-none d-sm-none d-md-block d-lg-block'
              data-bs-toggle="modal"
              data-bs-target="#ModalCreate"
              data-bs-whatever="@mdo"
            >Nuevo Usuario
            </button>
          }
        </div>
        <div className="d-flex justify-content-center flex-wrap align-items-center mt-5 gap-5">
          {
            filteredUsers.map((user) => (
              <UserCard
                email={user.email}
                key={user.id}
                id={user.id!}
                img={user.img}
                name={user.name}
                phone={user.phone}
                role={user.role}
                selectUser={setUser}
                cleanUser={cleanUser}
              />
            ))
          }
          {filteredUsers.length === 0 && (
            <div className="text-center">Usuario no Existente</div>
          )}
          <ModalDelete getUserList={getUsersList} />
          <ModalEdit getUserList={getUsersList} />
          <ModalCreate getUserList={getUsersList} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
    </Layout>
  )
}

