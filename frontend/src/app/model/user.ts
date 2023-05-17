export class User {
    idUser: number;
    email: string;
    password: string;
    role: Role;

    constructor(role: Role = 1) {
        this.role = role;
    }
}

export enum Role {
    ADMIN,
    USER,
    PERSONEL
}
