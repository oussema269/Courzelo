import { Component, OnInit } from '@angular/core';
import { course } from 'src/app/model/Course';
import { CourseService } from 'src/app/service/course.service';
@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit {
  constructor(private CourseService:CourseService){}
  search="";
  course!:any
  idc!:String
  selectedNiveau: string = '';

  listeCourse!:course[]
  ngOnInit() {
    this.course=new course();
    this.course=this.CourseService.getCourse().subscribe((data) => {
      this.course = data;
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  
  }
  delete(id: string) {
    // Afficher la boîte de dialogue de confirmation
    const confirmed = window.confirm('Voulez-vous vraiment supprimer cette course ?');
    
    // Si l'utilisateur clique sur "Oui" dans la boîte de dialogue
    if (confirmed) {
      // Supprimer la course
      this.CourseService.deleteCourse(id).subscribe(
        () => {
          console.log(`La course avec l'ID ${id} a été supprimée avec succès.`);
          // Actualiser la page après la suppression
          location.reload();
        },
        (error) => {
          console.error(`Erreur lors de la suppression de la course avec l'ID ${id} :`, error);
        }
      );
    } else {
      // Si l'utilisateur clique sur "Non" dans la boîte de dialogue
      console.log('Suppression de la course annulée.');
    }
  }
  
  modifier(id: string){
    this.idc=id;
    console.log(id);
  }
trier(){
  this.course=new course();
    this.course=this.CourseService.getCourseTrier().subscribe((data) => {
      this.course = data;
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
}
  afficher(){
    console.log(this.course);
  }

  getphoto(photo :string){
    return this.CourseService.getPhoto(photo);
  }
  filterByNiveau(){
    this.course=new course();
    this.course=this.CourseService.filterByNiveau(this.selectedNiveau).subscribe((data) => {
      this.course = data;
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );  }

rechercheMultiCritere(){
      this.course=new course();
  this.course=this.CourseService.rechercheMultiCritere(this.search).subscribe((data) => {
    this.course = data;
  },
  (error) => {
    console.error("Erreur lors de la récupération des données :", error);
  }
);
}

}
