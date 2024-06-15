import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { course } from 'src/app/model/Course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  constructor(private CourseService:CourseService , private ac:ActivatedRoute){

  }
  course!:any
  listeCourse!:course[];
  search="";
  courseRecente!:any
idDomaine!:string
  ngOnInit() {
    this.idDomaine=this.ac.snapshot.paramMap.get('idDomaine');
    this.course=this.CourseService.getCourByDomaine(this.idDomaine).subscribe((data) => {
      this.course = data;
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  
  }
  getphoto(photo :string){
    return this.CourseService.getPhoto(photo);
  }

  afficher(){
    console.log(this.course);
  }
  latestCourse(){
    this.CourseService.findCoursByDateGreaterThan().subscribe((data) => {
      this.courseRecente = data;
      console.log(this.courseRecente)
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  }

}
