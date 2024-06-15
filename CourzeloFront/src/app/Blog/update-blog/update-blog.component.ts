import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../BlogClass/blog';
//import { map, of, switchMap } from 'rxjs/dist/types';
import { BlogService } from '../BlogService/blog.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent {
  blog!: Blog;
  feedback: any = {};
  public Editor = ClassicEditor as any;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const blogId = params['id'];

      if (blogId === 'new') {
        this.blog = new Blog();
        this.feedback = {};
      } else {
        this.blogService.getBlog(blogId).subscribe({
          next: blog => {
            this.blog = blog;
            this.feedback = {};
          },
          error: () => {
            this.feedback = { type: 'warning', message: 'Error loading' };
          }
        });
      }
    });
  }

  save() {
    const id = this.blog.blogCode;

    this.blogService.updateBlog(id, this.blog).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Save was successful!' };
        setTimeout(async () => {
          await this.router.navigate(['/listBlog']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error saving' };
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/listBlog']);
  }

}


