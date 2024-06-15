import { Component, OnInit } from '@angular/core';
import { course } from 'src/app/model/Course';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CourseService } from 'src/app/service/course.service';
import { RessourceService } from 'src/app/service/ressource.service';
import { FormsModule } from '@angular/forms';
import { DomaineService } from 'src/app/services/domaine.service';
import { Domaine } from 'src/app/models/domaine';
import { Notification } from 'src/app/model/Notification';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  selectedFiles!: File[];

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
  course!:course
  notification!:Notification
  domaines:Domaine[]
  courseAdded:boolean=false
  constructor(private CourseService:CourseService , private ressourceService:RessourceService , private http:HttpClient ,private domaineService:DomaineService){}
  ngOnInit(){
    this.course=new course();
    this.notification=new Notification();
    this.domaines=this.getDomaines()

  }
  getDomaines(): Domaine[] {
    this.domaineService.findAll()
      .subscribe(domaines =>
        { this.domaines = domaines;
          console.log(this.course)
        }

        );
      return this.domaines;
  }


ajouter() {
  this.CourseService.postCourse(this.course).subscribe(
    () => {
      this.courseAdded=true;
      console.log(this.course)
      //alert("Cour ajouté !!");
    //  location.reload();
    },
    (error) => {
      console.error("Erreur lors de l'ajout de la course :", error);
    }
  );
}

ajouterNotification(){
  this.CourseService.ajouterNotification(this.notification).subscribe(
    () => {
      this.courseAdded=true;
      console.log(this.notification)
      alert("notif ajouté !!");
    //  location.reload();
    },
    (error) => {
      console.error("Erreur lors de l'ajout de la notif :", error);
    }
  );
}
selectedFile: File | null = null;
onFileSelected(event: any): void {
  const fileInput = event.target as HTMLInputElement;

  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
  } else {
    this.selectedFile = null;
  }
}



onUpload(): void {
  if (this.selectedFile) {
    // Use the BlogService to upload the file
    console.log(this.course.idCour);
    this.CourseService.uploadPhoto(this.course.idCour, this.selectedFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Handle progress event
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!', event);
          // Check the actual response and status here
        }
      },
      (error: any) => {
        console.error('Error uploading file:', error);
      }
    );

  }
}

}
