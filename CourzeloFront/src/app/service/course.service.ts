import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { course } from 'src/app/model/Course';
import { Observable } from 'rxjs';
import { Ressource } from '../model/Ressource';
import { FicheModuleCour } from '../model/ChatMessage';
import { TokenStorageService } from './token-storage-service.service';
import { Notification } from '../model/Notification';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  course!:course
  url='http://localhost:8282/cour'
   constructor(private http :HttpClient,private tokenStorageService :TokenStorageService) { }

   httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
    })
};
   getCourse(){
     return this.http.get(this.url+"/getCour",this.httpOptions);
   }
   postCourse(course:course){
     return this.http.post(this.url+"/ajouterCour",course,this.httpOptions)
   }
   ajouterFicheModule(fiche :FicheModuleCour){
   return  this.http.post("http://localhost:8282/FicheModuleCour/ajouterFicheModule",fiche)
   } 
   deleteCourse(id:string){
    return this.http.delete(`${this.url}/supprimerCour/${id}`,this.httpOptions);
  }
  modifierCourse(id:string , course:course){
    return this.http.put(`${this.url}/modifierCour/${id}`,course,this.httpOptions);
  }
  getCourseTrier(){
    return this.http.get(this.url+"/findAllByOrderByDateDesc",this.httpOptions);
  }
  uploadPhoto(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.url}/upload/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(uploadUrl, formData);
  }
  getCourById(id:string ){
    return this.http.get(`${this.url}/getCourbyid/${id}`,this.httpOptions);
  }
  getRessourceByCourId(id:string){
    return this.http.get(`${this.url}/getRessourcesByCourId/${id}`,this.httpOptions);

    
  }
  getPhoto(photo: string): string{
    const photoUrl = `${this.url}/download/${photo}`;

    return `${this.url}/download/${photo}`;
  }
  affecterRessourceAcour(id:string , ressource:Ressource){
    return this.http.post(`${this.url}/affecterRessourcesACour/${id}`,ressource,this.httpOptions);
  }
  uploadPhotoRessource(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.url}/uploadRessource/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(uploadUrl, formData);
  }
  findCoursByDateGreaterThan(){
    return this.http.get(`${this.url}/findCoursByDateGreaterThan`,this.httpOptions);

  }
  filterByNiveau(niveau:string){
    return this.http.get(`${this.url}/filterByNiveau/${niveau}`,this.httpOptions);
  }
  sendHtmlEmail(email:string , amount:any){
    return this.http.post(`${this.url}/sendHtmlEmail/${email}/${amount}`,{});
  }
  PdfGenerator(amount:any){
    return this.http.post(`${this.url}/PdfGenerator/${amount}`,{});

  }
  rechercheMultiCritere(search: String){
    return this.http.get(`${this.url}/findByNomCourOrDescription/${search}`,this.httpOptions);

  }
  getCourByDomaine(idDomaine : String){
    return this.http.get(`${this.url}/getCourByDomaine/${idDomaine}`);
  }
  PdfGeneratorFicheModule(fiche : FicheModuleCour){
    return this.http.post(this.url+"/PdfGeneratorFicheModule",fiche);

  }
  ajouterNotification(notification :Notification){
    return this.http.post("http://localhost:8282/notification/addNotifcation",notification);

  }
  getNotification(){
    return this.http.get("http://localhost:8282/notification/getNotifcations");
  }
  urldel="http://localhost:8282/notification"
  deleteNotif( idn:String){

    return this.http.delete(`${this.urldel}/deleteNotif/${idn}`);;

  }

  
}
