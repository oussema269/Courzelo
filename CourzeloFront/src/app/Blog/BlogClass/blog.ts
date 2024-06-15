import { User } from "src/app/shared/model/user.model";
import { Interactions } from "../InteractionsClass/interactions";

export class Blog {
    
    blogCode!: string;
    titreBlog!: string;
    dateBlog! : string;
    domaine! : string;
    contenu! : string;
    photo! : string;
    status! : boolean;
    interactions!: Interactions[];
    user!:User[];
    
}
