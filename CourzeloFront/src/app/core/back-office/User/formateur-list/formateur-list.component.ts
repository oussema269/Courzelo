import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import { UserService } from 'src/app/service/user.service';
import { Profile } from 'src/app/shared/model/profile.module';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-formateur-list',
  templateUrl: './formateur-list.component.html',
  styleUrls: ['./formateur-list.component.css']
})
export class FormateurListComponent implements OnInit {

  profileForm: FormGroup;
  updateProfileDialog: boolean = false
  id: any
  profile : any 
  formateur: any
  FormateurSearch: string = '';
  filteredFormateur: User[] = [];
  constructor(private userService: UserService, 
    private formBuilder: FormBuilder,
    private profileService: ProfileService, 
      private router: Router,
    ) { }


  ngOnInit(): void {
    this.getformateurs()
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^-?(0|[1-9]\d*){8}$/)]],
      address: ['', [Validators.required, Validators.minLength(8)]],
     
    });
  }
  getformateurs() {
    this.formateur = new User();
    this.formateur = this.userService.getUser("ROLE_FORMATEUR").subscribe((data) => {
      this.formateur = data;
      this.filteredFormateur = this.formateur;
    },
      (error) => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );
  }


  onSearch(): void {
    console.log('Search Input:', this.FormateurSearch);
  
    this.filteredFormateur = this.formateur.filter(user =>
      user.email.toLowerCase().includes(this.FormateurSearch.toLowerCase()) 
    );
    console.log('All Blogs:', this.formateur);
  }

  getUserById(id: number) {

    this.userService.getUserById(id).subscribe(
      (data) => {
        this.formateur = data

      });
  }
  getProfileByIdUser(id: number) {
    this.profileService.getProfileByIdUser(id).subscribe(
      (data) => {
        this.profile = data
        this.id = this.profile.id
      });
  }
 //-------------------- ban User
  /*
  activerUser(id: number) {
    this.authService.activeUser(id).toPromise().then(
      () => {

        this.activeUserDialog = false
        this.showSuccess("Compte activé avec succes")
        this.listTeachers(this.establishment.id)
      },
      (error) => {
        this.showError("Problème servunu lors de l'activation de compte")
      }
    )

  }
  desactiverUser(id: number) {
    this.authService.desactiveUser(id).toPromise().then(
      () => {
        this.desactiveUserDialog = false
        this.showSuccess("Compte desactivé avec succes")
        this.listTeachers(this.establishment.id)

      },
      (error) => {
        this.showError("Problème servunu lors de la désactivation de compte")
      }
    )
  }*/ 

  updateProfile() {

    this.profileService.modifyProfile(this.id, this.profile).toPromise().then(
      () => {
        this.updateProfileDialog = false
        console.log("Enseignant modifier avec succes")
        this.getformateurs()
      },
      (error) => {
       console.log("Problème servunu lors de la modification de l'enseignant")

      }
    )
  }

  getProfilePhotoUrl(p: Profile): string {
    return this.profileService.getPhoto(p.photo);
  }
}