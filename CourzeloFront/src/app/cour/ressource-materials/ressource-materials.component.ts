import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { course } from 'src/app/model/Course';
import { Ressource } from 'src/app/model/Ressource';
import { CourseService } from 'src/app/service/course.service';
import { RessourceService } from 'src/app/service/ressource.service';

@Component({
  selector: 'app-ressource-materials',
  templateUrl: './ressource-materials.component.html',
  styleUrls: ['./ressource-materials.component.css']
})
export class RessourceMaterialsComponent {
  course!:course
  id!:any
  courses!:any
  ressource!:Ressource[];
  constructor(private ac:ActivatedRoute,private courseService:CourseService,private router: Router , private RessourceService: RessourceService) {
  
}


ngOnInit() {
  this.id = this.ac.snapshot.paramMap.get('id');
  if(this.id) {
    this.getRessourceByCourId(this.id);
  }
 
}
  getRessourceByCourId(id:any){
    return this.courseService.getRessourceByCourId(id).subscribe(
      (data: any) => {
        this.ressource = data;
        console.log(this.ressource)
      },
      (error: any) => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );
  }
  DeleteRessource(idRessource:string){
    // Afficher la boîte de dialogue de confirmation
    const confirmed = window.confirm('Voulez-vous vraiment supprimer cette course ?');
    
    // Si l'utilisateur clique sur "Oui" dans la boîte de dialogue
    if (confirmed) {
      // Supprimer la course
      this.RessourceService.deleteRessource(idRessource).subscribe(
        () => {
          console.log(`La course avec l'ID ${idRessource} a été supprimée avec succès.`);
          // Actualiser la page après la suppression
          location.reload();
        },
        (error) => {
          console.error(`Erreur lors de la suppression de la course avec l'ID ${idRessource} :`, error);
        }
      );
    } else {
      // Si l'utilisateur clique sur "Non" dans la boîte de dialogue
      console.log('Suppression de la course annulée.');
    }
  }
}
