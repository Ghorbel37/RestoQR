export class User {
    idUser: number;
    email: string;
    password: string;
    role: Role;

    constructor(role: Role = null) {
        this.role = role;
    }
}

export enum Role {
    ADMIN,
    USER,
    PERSONEL
}

export const RoleLabels: Record<string, string> = {
    'ADMIN': 'Administrateur',
    'USER': 'Client',
    'PERSONEL': 'Personel'
};
