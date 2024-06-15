import { User } from "src/app/shared/model/user.model";

export class Interactions {
    id! : string;
    commentaire!: string;
    replay!:Interactions[];    
}
