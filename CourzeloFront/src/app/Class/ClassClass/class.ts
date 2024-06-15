import { User } from "src/app/shared/model/user.model";

export class Class {
    classCode!: string;
    nomClass!: string;
    CreatedAt! : string;
    Formateur!:User[];
    Etudiant! : User[];
}
