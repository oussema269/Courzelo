import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chapitre } from 'src/app/model/Chapitre';
import { FicheModuleCour } from 'src/app/model/ChatMessage';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-add-fiche-module',
  templateUrl: './add-fiche-module.component.html',
  styleUrls: ['./add-fiche-module.component.css']
})
export class AddFicheModuleComponent {
  constructor(private http :HttpClient ,private CourseService:CourseService) { }
  fiche!:FicheModuleCour
  nbChapitre!:number
  chapitresArray: number[] = [];
  chapitres: any[] = [];
  chapterName : string
  chapterDuree:number
  generateRandomString = (num: number | undefined) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = Math.random().toString(36).substring(0, num);
    return result1;
  }
  ajouterChapitre() {
    for(let i = 0; i < this.nbChapitre; i++) {
        const newChapitre: Chapitre = {idChapitre:this.generateRandomString(8), nomChapitre: this.chapterName, duree: this.chapterDuree }; // Crée un nouvel objet chapitre
        this.chapitres[i] = newChapitre; 
    }
}

  ngOnInit(){
    this.fiche=new FicheModuleCour();
    }
    
  ajouter() {
    this.fiche.chapitreList=this.chapitres;
    this.CourseService.ajouterFicheModule(this.fiche).subscribe(
      () => {
        console.log(this.chapitres)
        alert("fiche ajouté !!");
      //  location.reload();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la fiche :", error);
      }
    );
  }
  onNbChapitreChange() {
    this.chapitresArray = Array.from({length: this.nbChapitre}, (_, i) => i + 1);
  }
    
  }

