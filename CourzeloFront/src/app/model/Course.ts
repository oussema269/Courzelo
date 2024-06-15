import { Domaine } from "../models/domaine";
import { Ressource } from "./Ressource";

export class course {
    idCour!:string;
    nomCour!: string;
    description!: string;
    niveau!:string;
    ressource!:Ressource[];
    photo!:string;
    prix!:any
    nomDomaine!:string;
  }