import { User } from "../shared/model/user.model";

export class Commentaire {
    
    id?: string;
    fullname?: string;
    email?: string;
    corp?: string;
    subject?: string;
    date?: Date;
    Reponse?: string;
    user = new User() ;

}

