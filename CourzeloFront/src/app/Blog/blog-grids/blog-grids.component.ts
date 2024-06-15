import { Component } from '@angular/core';
import { Blog } from '../BlogClass/blog';
import { BlogService } from '../BlogService/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-grids',
  templateUrl: './blog-grids.component.html',
  styleUrls: ['./blog-grids.component.css']
})
export class BlogGridsComponent {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService ,private router : Router ) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }
  fetchBlogs(): void {
    this.blogService.getAprovedBlogs()
      .subscribe({
        next: (blogs) => {
          this.blogs = blogs;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }  
  getBlogPhotoUrl(blog: Blog): string {
    // Construct the image URL based on the backend API endpoint
    return this.blogService.getPhoto(blog.photo);
    
  }
  deleteBlog(blog: Blog): void {
    
    this.blogService.deleteBlog(blog.blogCode).subscribe(() => {
      
      this.blogs = this.blogs.filter((b) => b.blogCode !== blog.blogCode);
    });
  }
  navigateToUpdate(blogId: string): void {
    this.router.navigate(['/updateBlog/', blogId]);
  }
  navigateToAddBlog() {
    this.router.navigate(['/addBlog']);
  }

}
