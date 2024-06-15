import { Chapitre } from "./Chapitre";

export class FicheModuleCour {
    idFicheCour!:string;
    nomModule!: string;
    objectif!: string;
    niveau!:string;
    ects!:Number;
    chapitreList!:Chapitre[]
    
  }