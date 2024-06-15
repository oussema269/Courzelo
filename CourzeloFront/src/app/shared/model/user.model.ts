import { Faculte } from "src/app/Faculte/FaculteClass/faculte";
import { Profile } from "./profile.module";
import { ERole } from "./role";

export class User {
    id: number;
    email: string;
    username: string;
    password: string;
    roles: [ERole];
    profile:Profile
    verificationCode: string;
    enabled: boolean;s
    active: boolean;
    nomFaculte: string;
}
