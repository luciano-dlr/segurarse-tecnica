import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../../zustand/userStorage";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect } from "react";
import { toast } from "react-toastify";

type FormValues = {
    nameEdit: string;
    phoneEdit: string;
    emailEdit: string
}

interface ModalEditProps {
    getUserList: () => void;
}


export const ModalEdit = ({ getUserList }: ModalEditProps) => {

    const { selectedUser } = useUserStore()
    const collectionRef = collection(db, "Users")

    const { handleSubmit, control, setValue, formState, trigger } = useForm<FormValues>();

    //Valors submit del Formulario
    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        try {
            const updatedUserData = {
                ...selectedUser,
                name: data.nameEdit,
                email: data.emailEdit,
                phone: data.phoneEdit,
            };

            const userDocRef = doc(collectionRef, selectedUser?.id);

            await updateDoc(userDocRef, updatedUserData)
                .then(() => {
                    getUserList()
                    toast("Usuario Editado Correctamente")
                })
                .catch(() => {
                    toast("No se pudo editar el usuario")
                })

        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    //Actualizar los valores y trigger para disparar la validacion
    useEffect(() => {

        selectedUser?.name ? setValue('nameEdit', selectedUser.name) : setValue('nameEdit', '');
        selectedUser?.name && trigger('nameEdit')

        selectedUser?.email ? setValue('emailEdit', selectedUser.email) : setValue('emailEdit', '');
        selectedUser?.email && trigger('emailEdit')

        selectedUser?.phone ? setValue('phoneEdit', selectedUser.phone) : setValue('phoneEdit', '')
        selectedUser?.phone && trigger('phoneEdit')

    }, [selectedUser])


    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Ususario</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-block ">
                                <Controller
                                    name='nameEdit'
                                    control={control}
                                    rules={{
                                        validate: {
                                            required: (value) => !!value || "Ingrese Nombre",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <input
                                                className="form-control m-1"
                                                name="nameEdit"
                                                type="text"
                                                placeholder="Nombre"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setValue("nameEdit", e.target.value);
                                                    trigger("nameEdit");
                                                }}
                                                value={field.value}
                                                autoFocus={true}
                                            />
                                            <p>{fieldState.error?.message}</p>
                                        </>
                                    )}
                                />
                                <Controller
                                    name='emailEdit'
                                    control={control}
                                    rules={{
                                        validate: {
                                            required: (value) => !!value || "Ingrese Email",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <input
                                                className="form-control m-1"
                                                name="emailEdit"
                                                type="text"
                                                placeholder="Email"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setValue("emailEdit", e.target.value);
                                                    trigger("emailEdit");
                                                }}
                                                value={field.value}
                                                autoFocus={true}
                                            />
                                            <p>{fieldState.error?.message}</p>
                                        </>
                                    )}
                                />
                                <Controller
                                    name='phoneEdit'
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
                                            <input
                                                className="form-control m-1"
                                                name="phoneEdit"
                                                type="text"
                                                placeholder="Telefono"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setValue("phoneEdit", e.target.value);
                                                    trigger("phoneEdit");
                                                }}
                                                value={field.value}
                                                autoFocus={true}
                                            />

                                            <div className="d-flex justify-content-between">
                                                <p>{fieldState.error?.message}</p>
                                                <small >+54 351 123 4567</small>
                                            </div>
                                           
                                        </>
                                    )}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit" data-bs-dismiss="modal" disabled={!formState.isValid}>Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


