import { User } from "./user.model";

export class Profile {
    id: any;
    firstName: string;
    lastName: string;
    phone: number;
    address: string;
    photo: string;
    user = new User();
}