import { Component, OnInit } from '@angular/core';
import { PoleClass } from '../PoleClass/pole-class';
import { PoleServiceService } from '../PoleServices/pole-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-file-pole',
  templateUrl: './upload-file-pole.component.html',
  styleUrls: ['./upload-file-pole.component.css']
})
export class UploadFilePoleComponent implements OnInit{

  poles: PoleClass[] = [];
private poleId: string = 'pol'; // Replace with the actual blogId
selectedFile: File | null = null;
constructor(private poleService: PoleServiceService, private route: ActivatedRoute, private router: Router) { }
ngOnInit(): void {
  // Retrieve the faculteCode from the route parameters
  this.route.params.subscribe(params => {
    this.poleId = params['id'];
    console.log('Pole ID:', this.poleId);
  });
}
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
    console.log(this.poleId);
  
    this.poleService.uploadPhoto(this.poleId, this.selectedFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // const percentDone = Math.round((100 * event.loaded) / event.total);
          // console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!', event);         
        }
        this.router.navigate(['/getAllPoles']);
      },
      (error: any) => {
        console.error('Error uploading file:', error);          
      }
    );
    
  }
}

}

