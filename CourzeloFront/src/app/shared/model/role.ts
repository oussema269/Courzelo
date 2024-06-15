export enum ERole {
    ROLE_SUPERADMIN = 'ROLE_SUPERADMIN',
    ROLE_FORMATEUR = 'ROLE_FORMATEUR',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_PARTICIPANT = 'ROLE_PARTICIPANT'

}

export class Role {

    id: number;
    name: ERole;


}