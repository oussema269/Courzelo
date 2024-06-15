import { Component, OnInit } from '@angular/core';
import { BlogService } from '../BlogService/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../BlogClass/blog';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  blogs: Blog[] = [];
  private blogId: string = 'blog1'; // Replace with the actual blogId
  selectedFile: File | null = null;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    // Retrieve the blogCode from the route parameters
    this.route.params.subscribe(params => {
      this.blogId = params['id'];
      console.log('Blog ID:', this.blogId);
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
      console.log(this.blogId);
  
      this.blogService.uploadPhoto(this.blogId, this.selectedFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            // const percentDone = Math.round((100 * event.loaded) / event.total);
            // console.log(`File is ${percentDone}% uploaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!', event);           
          }
          this.router.navigateByUrl(`/listBlog`);
        },
        (error: any) => {
          console.error('Error uploading file:', error);          
        }
      );
      
    }
  }
  
}