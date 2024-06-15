import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { TokenStorageService } from 'src/app/service/token-storage-service.service';
import { User } from 'src/app/shared/model/user.model';
import { MustMatch } from 'src/app/shared/validators/confirmPassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
	user = new User();

	constructor(private formBuilder: FormBuilder,

		public authService: AuthServiceService,
		private tokenStorageService: TokenStorageService,
		private router: Router) { }

    ngOnInit(): void {
      this.user = this.tokenStorageService.getUser()
      this.changePasswordForm = this.formBuilder.group({
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]],
        confirmPassword: [''],
  
      },
        {
          validator: MustMatch('password', 'confirmPassword')
  
        },
      );
    }

    changePassword() {
      const password = this.changePasswordForm.get('password').value
      const oldPassword = this.changePasswordForm.get('oldPassword').value
      this.authService.changePassword(this.user.id, password, oldPassword).subscribe(
        (data) => {
          alert("Votre mot de passe est modifié avec succés.");
  
        },
        (error) => {
          alert("Veuillez vérifier de votre mot de passe actuel!");
  
        }
      )
    }
}
