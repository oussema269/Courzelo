import { User } from "../shared/model/user.model";

export class Notification {
    idNotif!:string;
    notification!:string;
    //user = new User() ;
    deadline!:Date;
    username!:string;
  }