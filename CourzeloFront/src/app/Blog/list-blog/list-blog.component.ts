import { Component, OnInit } from '@angular/core';
import { Blog } from '../BlogClass/blog';
import { BlogService } from '../BlogService/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchInput: string = '';
  sortBy: keyof Blog = 'blogCode';

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.fetchBlogs();
  }
  fetchBlogs(): void {
    this.blogService.getBlogList()
      .subscribe({
        next: (blogs) => {
          this.blogs = blogs;
          this.filteredBlogs = this.blogs;
          this.sortBlogs();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
  sortBlogs(): void {
    // Sort the blogs array based on the selected field and direction
    this.blogs.sort((a, b) => {
      if (a[this.sortBy] < b[this.sortBy]) {
        return 1;
      } else if (a[this.sortBy] > b[this.sortBy]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  
  // Update the sorting field and call sortBlogs
  onSortChange(): void {
    this.sortBlogs();
  }
  getBlogPhotoUrl(blog: Blog): string {
    return this.blogService.getPhoto(blog.photo);
  }
  deleteBlog(blog: Blog): void {

    this.blogService.deleteBlog(blog.blogCode).subscribe(() => {

      this.blogs = this.blogs.filter((b) => b.blogCode !== blog.blogCode);
    });
    this.fetchBlogs();
  }
  navigateToUpdate(blogId: string): void {
    this.router.navigate(['/updateBlog/', blogId]);
  }
  navigateToAddBlog() {
    this.router.navigate(['/addBlog']);
  }
  onSearch(): void {
    console.log('Search Input:', this.searchInput);
    
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.titreBlog.toLowerCase().includes(this.searchInput.toLowerCase())||blog.domaine.toLowerCase().includes(this.searchInput.toLowerCase()) ||blog.dateBlog.toLowerCase().includes(this.searchInput.toLowerCase())     
    );
    console.log('All Blogs:', this.blogs);
  }
}
