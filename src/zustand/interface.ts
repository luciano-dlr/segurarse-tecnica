export interface User {
    id?: string;
    email: string;
    img: string;
    name: string;
    password: string;
    phone: string;
    role:RolType
}

export interface SelectedUser {
    id: string;
    name: string;
    email: string;
    phone: string;

}

export type RolType = 'Admin' | 'Consulta' | 'Vendedor' | 'Gerente' | 'Atención al Cliente'  


