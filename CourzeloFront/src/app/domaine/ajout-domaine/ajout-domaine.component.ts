import { Component } from '@angular/core';
import { Domaine } from '../../models/domaine';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DomaineService } from '../../services/domaine.service';
import { FileService } from 'src/app/services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-ajout-domaine',
  templateUrl: './ajout-domaine.component.html',
  styleUrls: ['./ajout-domaine.component.css']
})
export class AjoutDomaineComponent {
  addDomaineForm: FormGroup;

  selectedFile: File | null = null;
  domaineId:any;

  constructor(
    private formBuilder: FormBuilder,
    private domaineService: DomaineService,
    private photoService: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.domaineId =this.route.snapshot.paramMap.get('id');
    this.addDomaineForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(10)]],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addDomaineForm.valid) {
      const domaineData: Domaine = this.addDomaineForm.value;
      this.domaineService.saveDomaine(domaineData).subscribe(
        response => {
          alert('Domaine ajouté avec succès !');
          this.router.navigate(['/domaines']);
          //msh nafes nom taa domaine
        },
        error => {
          alert('Une erreur est survenue lors de l\'ajout du domaine.');
        }
      );
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  }
  
}