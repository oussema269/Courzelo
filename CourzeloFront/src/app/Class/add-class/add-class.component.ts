import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from '../ClassClass/class';
import { ClassServiceService } from '../ServiceClass/class-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  formateurs: User[] = []; // Store all formateurs
  selectedFormateurs: User[] = []; // Store selected formateurs for the class

  ClassSaveForm = new FormGroup({
    nomClass: new FormControl('', [Validators.required, Validators.minLength(5)]),
    formateurs: new FormControl([]), // FormControl for selected formateurs
    etudiants: new FormControl([]) // FormControl for selected etudiants
  });

  class: Class = {
    classCode: '',
    nomClass: '',
    CreatedAt: '',
    Formateur: [],
    Etudiant: []
  };

  submitted = false;

  constructor(
    private classService: ClassServiceService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getFormateurs();
  }

  saveClass(): void {
    if (this.ClassSaveForm.invalid) {
      return;
    }

    const selectedFormateurs = this.ClassSaveForm.get('formateurs')!.value;

    const data = {
      nomClass: this.ClassSaveForm.get('nomClass')!.value,
      formateurs: selectedFormateurs,
      etudiant: this.ClassSaveForm.get('etudiants')!.value
    };

    console.log('Form data:', data);

    // Call your service method to save data
  }

  getFormateurs() {
    this.userService.getUser("ROLE_PARTICIPANT").subscribe(
      (data: User[]) => {
        this.formateurs = data;
      },
      (error) => {
        console.error("Error fetching formateurs:", error);
      }
    );
  }

  isFormateurSelected(formateur: User): boolean {
    return this.selectedFormateurs.some(f => f.id === formateur.id);
  }

}
