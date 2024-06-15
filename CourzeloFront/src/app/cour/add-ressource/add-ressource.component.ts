import { Component, ViewChild, ElementRef } from '@angular/core';
import { RessourceService } from 'src/app/service/ressource.service';
import { course } from 'src/app/model/Course';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { Ressource } from "src/app/model/Ressource";
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent {
  generateRandomString = (num: number | undefined) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = Math.random().toString(36).substring(0, num);
    return result1;
  }
 num!:number
course!:course
id!:any
ressource: Ressource = new Ressource();
constructor(private ac:ActivatedRoute,private courseService:CourseService,private ressourceService: RessourceService,private router: Router) {

}

ngOnInit(){
  this.course=new course();
  this.id=this.ac.snapshot.paramMap.get('id');
}
save(f:NgForm){
  console.log(this.course.niveau)
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

onUploadCourse(): void {
  if (this.selectedFile) {
    
    console.log(this.id);
    this.courseService.uploadPhoto(this.id, this.selectedFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
         
          // Handle progress event
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!', event);
          // Check the actual response and status here
         
        }
      } ,
      (error: any) => {
        console.error('Error uploading file:', error);
      }
    );

  }
}

affecterRessourceAcour() {
   

  this.ressource.idRessource = this.generateRandomString(8);
  console.log(this.ressource.nomRessource, "le id de ressource est " + this.ressource.idRessource);

  return this.courseService.affecterRessourceAcour(this.id, this.ressource).subscribe(
    () => {
      alert("Ressource ajouté !!");
      this.router.navigate(['/delete-course']);
    },
    (error) => {
      console.error("Erreur lors de l'ajout de la Ressource :", error);
    }
  );
}

onUploadRessource(): void {
  if (this.selectedFile) {
    
    console.log(this.id);
    this.courseService.uploadPhoto(this.ressource.idRessource, this.selectedFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
         
          // Handle progress event
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!', event);
          // Check the actual response and status here
         
        }
      } ,
      (error: any) => {
        console.error('Error uploading file:', error);
      }
    );

  }
}
}
