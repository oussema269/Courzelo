import { Component, OnInit } from '@angular/core';
import { Blog } from '../Blog/BlogClass/blog';
import { BlogService } from '../Blog/BlogService/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  blogs: Blog[] = [];
  loadingBlogs = true
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.loadingBlogs = false
    this.fetchBlogs();
  }
  fetchBlogs(): void {
    this.blogService.getToAprovedBlogs()
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
    return this.blogService.getPhoto(blog.photo);
  }
  deleteBlog(blog: Blog): void {

    this.blogService.deleteBlog(blog.blogCode).subscribe(() => {

      this.blogs = this.blogs.filter((b) => b.blogCode !== blog.blogCode);
    });
  }
  approveBlog(blogId: string): void {
    this.blogService.approveBlog(blogId).subscribe(() => {

      this.blogs = this.blogs.filter((b) => b.blogCode !== blogId);
    });

    this.blogService.getToAprovedBlogs().subscribe(updatedBlogs => {
      
      this.blogs = updatedBlogs;
      
    });
  }
  approveAllBlogs(): void {
    this.blogService.approveAllBlogs().subscribe(() => {});

    this.blogService.getBlogList().subscribe(updatedBlogs => {
      
      this.blogs = updatedBlogs;
    });
  }
  navigateToAddBlog() {
    this.router.navigate(['/addBlog']);
  }
}
