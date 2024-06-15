import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ERole } from 'src/app/shared/model/role';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit{
  user: any = {};
  isLoggedIn: Boolean = false;
  isLoginFailed = false;
  AdminForm: FormGroup;
  
  constructor(private authService: AuthServiceService,
    // private messageService: MessageService,
    private _routes:Router,
     private formBuilder: FormBuilder,
     private messageService: MessageService,) { }

  ngOnInit(): void {
    this.user = new User();
    this.AdminForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    
}

registerAdmin() {
  console.log(this.user.password)
    this.user.roles = ["admin"]
    console.log("user = ",this.user)
    this.authService.signupWithIdentifiant(this.user).subscribe(
      (data) => {
       alert("Admin registered successfully!") 
       this.resetForm();
      },
      (error) => {
       alert("erreur register !");
       console.log("erreur register .component")
      }
    );
  }
  showWarming(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Alerte', detail: message });
  }
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  resetForm() {
    this.AdminForm.reset(); // Réinitialiser le formulaire à son état initial
  }

}
