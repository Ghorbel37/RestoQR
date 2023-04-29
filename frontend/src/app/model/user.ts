export class User {
    idUser: number;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    ADMIN,
    USER,
    PERSONEL
}
