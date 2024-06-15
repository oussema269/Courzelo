import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient}from "@angular/common/http";
import { Blog } from '../BlogClass/blog';
import { Interactions } from '../InteractionsClass/interactions';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl='http://localhost:8282/blog'

  constructor(private http:HttpClient) { }
  getBlogList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/getAllBlogs');  
  }  
  getToAprovedBlogs(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/getAllUnapprovedBlogs');  
  }  
  getAprovedBlogs(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/getAprovedBlogs');  
  }  
  
  createBlog(blogData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+'/addBlog', blogData, { headers });
  }
  
  deleteBlog(id: string): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/deleteBlog/${id}`, { responseType: 'text' });  
  }  
  getBlog(id: string): Observable<Blog> {  
    return this.http.get<Blog>(`${this.baseUrl}/getDetailsBlog/${id}`);  
  }  
 
  getComment(id: string): Observable<Interactions> {
    return this.http.get<Interactions>(`${this.baseUrl}/getinteractions/${id}`);
  }
  
  
  updateBlog(id: string, blog: Blog): Observable<Object> {  
    return this.http.put(`${this.baseUrl}/modifierBlog/${id}`, blog);  
  }  

  uploadPhoto(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.baseUrl}/upload/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(uploadUrl, formData);
  }
  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this.baseUrl}/download/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getPhoto(photo: string): string{
    const photoUrl = `${this.baseUrl}/download/${photo}`;

    return `${this.baseUrl}/download/${photo}`;
  }
  addComment(id: string,comment: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+`/addinteraction/${id}`, comment, { headers });
  }
  addReply(id: string,reply: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+`/addReponse/${id}`, reply, { headers });
  }
  approveBlog(id: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`${this.baseUrl}`+`/approveBlog/${id}`,{ headers });
  }
  approveAllBlogs(): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`${this.baseUrl}`+`/approveAll`,{ headers });
  }
  getReplies(interactionId: string): Observable<Interactions[]> {
    const url = `${this.baseUrl}/getReplies/${interactionId}`;
    return this.http.get<Interactions[]>(url);
  }
    

}
