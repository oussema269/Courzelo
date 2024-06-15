import { PoleClass } from "src/app/Pole/PoleClass/pole-class";
import { User } from "src/app/shared/model/user.model";

export class Faculte {
    codeFaculte ! : String ;
    nom ! : String;
    adresse ! : String;
    telephone ! : number;
    description ! : String;
    photoUrl ! : String;
    users!: User[]
    // pole ! : PoleClass;

}
