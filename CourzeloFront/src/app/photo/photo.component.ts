import { Component } from '@angular/core';
import { Domaine } from '../models/domaine';
import { DomaineService } from '../services/domaine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from '../services/file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  domaine: Domaine[] = [];
  private domaineId:any; 
  selectedFile: File | null = null;
  

  constructor(private domaineservice: FileService, private route: ActivatedRoute,private router: Router,private location: Location,) { }
  ngOnInit(): void {
    // Retrieve the blogCode from the route parameters
    this.domaineId =this.route.snapshot.paramMap.get('id');
  }


  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    } else {
      this.selectedFile = null;
    }
  }
  domaines(): void {
    this.router.navigate(['/domaines']);
  }
  goBack(): void {
    this.location.back();
  }

  onUpload(): void {
    if (this.selectedFile) {
      // Use the BlogService to upload the file
      console.log(this.domaineId);
      this.domaineservice.uploadPhoto(this.domaineId, this.selectedFile).subscribe(
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
