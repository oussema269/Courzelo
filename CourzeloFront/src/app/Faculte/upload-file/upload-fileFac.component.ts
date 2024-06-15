import { Component, OnInit } from '@angular/core';
import { Faculte } from '../FaculteClass/faculte';
import { FaculteService } from '../FaculteService/faculte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileFacComponent implements OnInit {
  facultes: Faculte[] = [];
  private faculteId: string = 'fac'; // Replace with the actual blogId
  selectedFile: File | null = null;

  constructor(private faculteSrvice: FaculteService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    // Retrieve the faculteCode from the route parameters
    this.route.params.subscribe(params => {
      this.faculteId = params['id'];
      console.log('Faculte ID:', this.faculteId);
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
      console.log(this.faculteId);

      this.faculteSrvice.uploadPhoto(this.faculteId, this.selectedFile).subscribe(
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
