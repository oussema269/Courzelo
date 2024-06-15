import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { TokenStorageService  } from './token-storage-service.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiURL = environment.api_Url;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
  //for teacher
  signInWithId(user: User) {
    return this.http.post(`${this.apiURL}auth/signin`, user);
  }
  signupWithIdentifiant(user: User) {
    return this.http.post(`${this.apiURL}auth/signup`, user);
  }

//for student
  signupWithEmail(user: User) {
    return this.http.post(`${this.apiURL}auth/signupWithEmail`, user);
  }
  signinWithEmail(user: User) {
    return this.http.post<any>(`${this.apiURL}auth/signinWithEmail`, user);
  }

  getUserByVerificationCode(verificationCode: string) {
    return this.http.get(`${this.apiURL}auth/connect/${verificationCode}`)
  }
  //passsword


  getUserByResetPasswordToken(resetPasswordToken: any) {
    return this.http.get(`${this.apiURL}auth/reset_password/${resetPasswordToken}`)
  }


  resetPassword(resetPasswordToken: any, user: any) {
    return this.http.post(`${this.apiURL}auth/reset_password/${resetPasswordToken}`, user);
  }

  forgetPassword(user: any) {
    return this.http.post(`${this.apiURL}auth/forgot_password`, user);
  }

  changePassword(user_id: any, password: string, oldPassword: string) {
    return this.http.post(`${this.apiURL}auth/change-password`, {
      user_id,
      oldPassword,
      password
    });
  }



}
