import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Faculte } from 'src/app/Faculte/FaculteClass/faculte';
import { FaculteService } from 'src/app/Faculte/FaculteService/faculte.service';
import { PoleClass } from 'src/app/Pole/PoleClass/pole-class';
import { PoleServiceService } from 'src/app/Pole/PoleServices/pole-service.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ProfileService } from 'src/app/service/profile.service';
import { TokenStorageService } from 'src/app/service/token-storage-service.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-add-formateur',
  templateUrl: './add-formateur.component.html',
  styleUrls: ['./add-formateur.component.css']
})
export class AddFormateurComponent {
  user: any = {};
  isLoggedIn: Boolean = false;
  isLoginFailed = false;
  AdminForm: FormGroup;
  facultes: Faculte[]=[];
  nomFac:string
  poles: PoleClass[]=[];
  
  constructor(private authService: AuthServiceService,
    private tokenStorageService: TokenStorageService,
    private userServ: UserService,
    private _routes:Router,
    private faculteservice: FaculteService,
    private poleservice: PoleServiceService,
     private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = new User();
    this.AdminForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      
    });
    this.fetchFacultes() ;
}


registerAdmin() {
    this.user.roles = ["formateur"]
    console.log("user = ",this.user)
    this.authService.signupWithIdentifiant(this.user).subscribe(
      (data) => {

        alert("Formateur registered successfully!") 
        this.resetForm();
      
      },
      (error) => {
        alert("this email already exist !!! ")
      
      }
    );
  }
  resetForm() {
    this.AdminForm.reset(); // Réinitialiser le formulaire à son état initial
  }



  fetchFacultes(): void {
    this.faculteservice.getAllfaculte().subscribe(
      (facultes) => {
        this.facultes = Array.isArray(facultes) ? facultes : []; 
        console.log(this.facultes);
      },
      (error) => {
        console.error(error);
      }
    );
  
  
  }  


}
