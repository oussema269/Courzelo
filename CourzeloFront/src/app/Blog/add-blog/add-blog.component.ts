import { Component, OnInit } from '@angular/core';
import { BlogService } from '../BlogService/blog.service';
import { Blog } from '../BlogClass/blog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  Blogsaveform = new FormGroup({
    titreBlog: new FormControl('', [Validators.required, Validators.minLength(5)]),
    dateBlog: new FormControl(),
    domaine: new FormControl(),
    contenu: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  blog: Blog = {
    blogCode: '',
    titreBlog: '',
    dateBlog: '',
    domaine: '',
    contenu: '',
    photo: '',
    status:false,
    interactions:[],
    user:[],
  };
  submitted = false;
  public Editor = ClassicEditor as any;

  constructor(private blogService: BlogService, private router: Router) { }

  saveBlog(): void {
    if (this.Blogsaveform.invalid) {
      return;
    }

    const data = {
      titreBlog: this.Blogsaveform.get('titreBlog')!.value,
      dateBlog: this.Blogsaveform.get('dateBlog')!.value,
      domaine: this.Blogsaveform.get('domaine')!.value,
      contenu: this.Blogsaveform.get('contenu')!.value
    };

    this.blogService.createBlog(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.router.navigateByUrl(`/upload/${res.blogCode}`);
        console.log("ahawa: ", res.blogCode);
      },
      error: (e) => console.error(e)
    });
  }

  newBlog(): void {
    this.submitted = false;
    this.blog = {
      blogCode: '',
      titreBlog: '',
      dateBlog: '',
      domaine: '',
      contenu: '',
      photo: '',
      status:false,
      interactions:[],
      user:[],
    };
  }

  ngOnInit(): void {
  }
}
