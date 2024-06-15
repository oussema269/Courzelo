import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/service/profile.service';
import { UserService } from 'src/app/service/user.service';
import { Profile } from 'src/app/shared/model/profile.module';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  usersWithProfiles: any[] = [];
  admin: any
  profileForm: FormGroup;
  profile: any;
  FormateurSearch: string = '';
  filteredFormateur: User[] = [];
  formateur: any
  updateProfileDialog: boolean = false
  id: any
  constructor(private userService: UserService, private profileservice: ProfileService, private formBuilder: FormBuilder,) { }


  ngOnInit(): void {
    this.getAdmins();
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^-?(0|[1-9]\d*){8}$/)]],
      address: ['', [Validators.required, Validators.minLength(8)]],

    });
  }
  getAdmins() {
    this.admin = new User();
    this.admin = this.userService.getUser("ROLE_ADMIN").subscribe((data) => {
      this.admin = data;
      this.filteredFormateur = this.admin;
    },
      (error) => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );

  }

  onSearch(): void {
    console.log('Search Input:', this.FormateurSearch);

    this.filteredFormateur = this.admin.filter(user =>
      user.email.toLowerCase().includes(this.FormateurSearch.toLowerCase())
    );
    console.log('All admins:', this.admin);
  }
  getUserById(id: number) {

    this.userService.getUserById(id).subscribe(
      (data) => {
        this.formateur = data

      });
  }
  getProfileByIdUser(id: number) {
    this.profileservice.getProfileByIdUser(id).subscribe(
      (data) => {
        this.profile = data
        this.id = this.profile.id

      });

  }

  updateProfile() {

    this.profileservice.modifyProfile(this.id, this.profile).toPromise().then(
      () => {
        this.updateProfileDialog = false
        console.log("Enseignant modifier avec succes")
        this.getAdmins()
      },
      (error) => {
        console.log("Problème servunu lors de la modification de l'enseignant")

      }
    )
  }
  getProfilePhotoUrl(p: Profile): string {
    return this.profileservice.getPhoto(p.photo);
  }

}