import { User } from "../shared/model/user.model";

export class Support{

   
    dateReclamation: Date = new Date();
    titre: string = '';
    description: string = '';
    user = new User() ;
}