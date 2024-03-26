import { useForm, SubmitHandler } from "react-hook-form";
import LogoDraw from '../../assets/LogoDraw.png';
import SegurarseLogo from '../../assets/segurarseLogo.png';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, } from 'firebase/firestore'
import { db } from "../../firebase/firebase";
import { useAuthStore } from '../../zustand/authStorage';
import { User } from '../../zustand/interface';
import {  toast } from 'react-toastify';

type Inputs = {
  email: string
  password: string
}

export const LoginScreen = () => {

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const collectionRef = collection(db, "Users")
      const querySnapshot = await getDocs(collectionRef);
      const userFound = querySnapshot.docs.find((doc) => {

        const user = doc.data();
        if (user.email === data.email && user.password === data.password) {
          return doc
        }
      })

      if (userFound) {

        const user = userFound.data()
        const userData: User = {
          id: userFound.id,
          email: user.email,
          img: user.img,
          name: user.name,
          password: user.password,
          phone: user.phone,
          role: user.role
        }

        setUser(userData)
        navigate("/homeScreen");
      }
      else {
        toast.error("Usuario o Contraseña Incorrecto")
      }

    } catch (error) {
      toast.error('Error al conectar al servidor')
      console.error("Error al verificar las credenciales:", error);
    }

  }


  return (
    <div className='d-flex justify-content-evenly vh-100 w-100 p-4 gap-5'>

      <div className="col-lg-6 d-flex justify-content-center align-items-center d-none d-sm-none d-md-none d-lg-flex"
        style={{ backgroundColor: 'rgba(63,132,255,0.71)', borderRadius: '25px' }}>
        <img src={LogoDraw} className='w-50 h-50 object-fit-contain' />
      </div>
      <div className='d-flex justify-content-center align-items-center col-12 col-sm-12 col-md-12 col-lg-5'>
        <div>
          <div className='d-flex justify-content-center align-items-center'>
            <img src={SegurarseLogo} className='img-fluid' />
          </div>
          <div className="mb-5 mt-4">
            <h2>Ingrese a su cuenta</h2>
            <h6>Vea lo que está pasando con su negocio</h6>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
            <div className={!errors.email ? 'd-grid gap-2 mb-5' : 'd-grid gap-2'} >
              <input placeholder="Email"{...register("email", { required: true })} className="form-control" />
            </div>
            {errors.email && <span className='pb-3 fw-bold text-danger'>Ingrese Email</span>}
            <div className={!errors.password ? 'd-grid gap-2 mb-5' : 'd-grid gap-2'}  >
              <input placeholder="Contraseña" {...register("password", { required: true })} type="password" className="form-control" />
            </div>
            {errors.password && <span className='pb-3 fw-bold text-danger'>Ingrese contraseña</span>}
            <button
              type="submit"
              className="btn mt-2 text-light"
              style={{ backgroundColor: 'rgba(63,132,255,1)' }} >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}