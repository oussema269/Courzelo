import { Component, Input } from '@angular/core';
import { course } from 'src/app/model/Course';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent {
  course!:course
  id!:any
  courses!:any
  ressource!:any
constructor(private ac:ActivatedRoute,private courseService:CourseService,private router: Router) {
  
}

  ngOnInit(){
    this.course=new course();
    this.id=this.ac.snapshot.paramMap.get('id');

  }
  save(f:NgForm){
    console.log(this.course.niveau)
  }
  modifier(){
    console.log(this.id)
    this.courseService.modifierCourse(this.id,this.course).subscribe(
      () => {
        alert("Cour modifier !!");
        this.router.navigate(['/delete-course']);

      },
      (error) => {
        console.error("Erreur lors de l'ajout de la course :", error);
      }
    );
  }
  getcour(){

    return this.courseService.getCourById(this.id).subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
     
  }
  

}
