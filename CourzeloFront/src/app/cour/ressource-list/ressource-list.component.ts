import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { course } from 'src/app/model/Course';
import { Ressource } from 'src/app/model/Ressource';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css']
})
export class RessourceListComponent {
  constructor(private courseService: CourseService, private ac: ActivatedRoute, private router: Router) { }
  
  course: course = new course();
  listeCourse: course[] = [];
  search = "";
  id!: any;
  ressource!:Ressource[]
  ngOnInit() {
    this.id = this.ac.snapshot.paramMap.get('id');
    if (this.id) {
      this.getCourseById(this.id);
      this.getRessourceByCourId(this.id);
    }
   
  }

  getCourseById(id: any)  {
  return this.courseService.getCourById(id).subscribe(
      (data: any) => {
        this.course = data;

      },
      (error: any) => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );
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

  getphoto(photo: string) {
    return this.courseService.getPhoto(photo);
  }
}
