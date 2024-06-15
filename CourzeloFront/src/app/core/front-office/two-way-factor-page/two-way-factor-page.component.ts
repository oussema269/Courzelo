import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { TokenStorageService } from 'src/app/service/token-storage-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-two-way-factor-page',
  templateUrl: './two-way-factor-page.component.html',
  styleUrls: ['./two-way-factor-page.component.css']
})
export class TwoWayFactorPageComponent {
  user: any = {};
  verificationCode: any;
  isShow = true;
  private messageService: MessageService
  constructor(
    private authService: AuthServiceService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
   ) { }


  
   verifyCode() {
    console.log(this.verificationCode);
    let remainingAttempts = 1; // Nombre de tentatives restantes
  
    this.authService.getUserByVerificationCode(this.verificationCode).subscribe(
      (data) => {
        if (data) {
          console.log("data = ", data)
          alert("ccount activated you can log in")
          this.router.navigate(['/login']);
        } else {
          remainingAttempts--;
          if (remainingAttempts > 0) {
            alert("Bad Code. " + remainingAttempts + " attempts remaining");
          } else {
            alert("Exceeded maximum attempts. Redirecting to login page.");
            this.userService.deleteUser().subscribe(
              ()=>console.log("fet 3 marat code ghalet + tfasakh mel db ")
            )
            this.router.navigate(['/register']);
          }
        }
      },
      (error) => {

          this.router.navigate(['/login']);
        
        console.log("err two way factor", error);
      }
    );
  }
  

}
