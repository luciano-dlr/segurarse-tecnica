import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { RolType, User } from "../../zustand/interface";
import { imgbbUpload } from "imgbb-image-uploader";

interface ModalCreateProps {
    getUserList: () => void;
}

export const ModalCreate = ({ getUserList }: ModalCreateProps) => {

    const collectionRef = collection(db, "Users")

    const { handleSubmit, control, setValue, formState, trigger } = useForm<User>();

    const [selectFile, setSelectFile] = useState<File>()

    //Crear usuario
    const onSubmit: SubmitHandler<User> = (user) => {
        if (selectFile) {
            //subir La imagen a https://imgbb.com/
            imgbbUpload({
                key: "d869f7ff1fa4bbf765758b304a4d8a10",
                image: selectFile,
            })
                .then(async (data) => {

                    //Nuevos Valores
                    const newUser: User = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        password: user.password,
                        role: user.role,
                        img: data.data.display_url
                    }
                    //Agregar documento a firebase
                    await addDoc(collectionRef, newUser).then(() => {
                        //get de todos los documentos 
                        getUserList()
                        toast("Usuario Creado")
                    })
                })
        }
    }

    return (
        <div className="modal fade" id="ModalCreate" tabIndex={-1} aria-labelledby="ModalCreate" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-block ">
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{
                                        validate: {
                                            required: (value) => !!value || "Ingrese Nombre",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <label>Nombre</label>
                                            <input
                                                className="form-control m-1"
                                                name="name"
                                                type="text"
                                                placeholder="Nombre"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setValue("name", e.target.value);
                                                    trigger("name");
                                                }}
                                                value={field.value}
                                            />
                                            <p>{fieldState.error?.message}</p>
                                        </>
                                    )}
                                />
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{
                                        validate: {
                                            required: (value) => !!value || "Ingrese Email",
                                            pattern: (value) =>
                                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(
                                                    value
                                                ) || "Email inválido",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <label>Email</label>
                                            <input
                                                className="form-control m-1"
                                                name="email"
                                                type="text"
                                                placeholder="Email"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setValue("email", e.target.value);
                                                    trigger("email");
                                                }}
                                                value={field.value}
                                            />
                                            <p>{fieldState.error?.message}</p>
                                        </>
                                    )}
                                />
                                <Controller
                                    name='password'
                                    control={control}
                                    rules={{
                                        validate: {
                                            required: (value) => !!value || "Ingrese Contraseña",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <label>Contraña</label>
                                            <input
                                                className="form-control m-1"
                                                name="password"
                                                type="password"
                                                placeholder="Contraseña"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setValue("password", e.target.value);
                                                    trigger("password");
                                                }}
                                                value={field.value}
                                            />
                                            <p>{fieldState.error?.message}</p>
                                        </>
                                    )}
                                />
                                <Controller
                                    name='phone'
                                    control={control}
                                    rules={{
                                        validate: {
                                            required: (value) => !!value || "Ingrese Telefono",
                                            pattern: (value) =>
                                                /^(?:\+?(\d{1,3}))?[-. (](\d{3})[-. )](\d{3})[-. ](\d{4})(?:x(\d+))?$/.test(
                                                    value
                                                ) || "Telefono inválido",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <label>Telefono</label>
                                            <input
                                                className="form-control m-1"
                                                name="phone"
                                                type="text"
                                                placeholder="Telefono"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setValue("phone", e.target.value);
                                                    trigger("phone");
                                                }}
                                                value={field.value}
                                            />
                                            <div className="d-flex justify-content-between">
                                            <p>{fieldState.error?.message}</p>
                                            <small >+54 351 123 4567</small>
                                            </div>
                                        </>
                                    )}
                                />
                                <Controller
                                    name='role'
                                    control={control}
                                    rules={{
                                        validate: {
                                            required: (value) => !!value || "Seleccione un Rol",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <label >Roles</label>
                                            <select
                                                className="form-control m-1"
                                                name="role"
                                                onChange={(e) => {
                                                    field.onChange();
                                                    setValue("role", e.target.value as RolType);
                                                    trigger("role");
                                                }}
                                                value={field.value}
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Consulta">Consulta</option>
                                                <option value="Vendedor">Vendedor</option>
                                                <option value="Gerente">Gerente</option>
                                                <option value="Atención al Cliente">Atención al Cliente</option>
                                            </select>
                                            <p>{fieldState.error?.message}</p>
                                        </>
                                    )}
                                />
                                <Controller
                                    name='img'
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <label htmlFor="formFile" className="form-label">Subir Imagen</label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                                name='img'

                                                onChange={(e) => {
                                                    field.onChange();
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        const selected = e.target.files[0]
                                                        setSelectFile(selected);

                                                    }
                                                }}
                                            />

                                            <p>{!selectFile && 'Seleccione un archivo'}</p>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="d-flex justify-content-end pt-3 pb-3 gap-1" >
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                <button className="btn btn-primary" type="submit" disabled={!formState.isValid || !selectFile} data-bs-dismiss="modal" >Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


