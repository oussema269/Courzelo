import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { TokenStorageService } from './token-storage-service.service';
import { Observable, Subject, tap } from 'rxjs';
import { Profile } from '../shared/model/profile.module';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileURL = environment.api_Url+ 'profile';

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
    })
};
  
  private _refreshRequired = new Subject<void>();
  get refreshRequired() {
    return this._refreshRequired;
  }

  getProfileByIdUser(id: number): Observable<Profile> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get<Profile>(`${this.profileURL}/getProfileByUser/${id}`, httpOptions)
  }

  addProfile(profile: Profile) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(`${this.profileURL}/addProfile`, profile, httpOptions);
  }

  getProfileById(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(`${this.profileURL}/getProfile/${id}`, httpOptions)
  }

  getProfiles() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(`${this.profileURL}/getAllProfile`, httpOptions)
  }
  getProfileByEmailUser(email:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(`${this.profileURL}/getProfileByEmail/${email}`, httpOptions)
  }
  modifyProfile( id: any, profile: Profile) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.put(`${this.profileURL}/modify-profile/${id}`, profile, httpOptions).pipe(
      tap(() => {
        this.refreshRequired.next();
      })
    );

  }
  //image api : w9efettt lenaaa
  uploadPhoto(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.profileURL}/photo/upload/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.httpClient.post(uploadUrl, formData);
  }

  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this.profileURL}/photo/download/${fileName}`;
    return this.httpClient.get(url,{ responseType: 'blob' });
  }

  getPhoto(photo: string): string{
    const photoUrl = `${this.profileURL}/photo/download/${photo}`;

    return `${this.profileURL}/photo/download/${photo}`;
  }
}
