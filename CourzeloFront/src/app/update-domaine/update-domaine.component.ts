import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Domaine } from '../models/domaine';

import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DomaineService } from '../services/domaine.service';


@Component({
  selector: 'app-update-domaine',
  templateUrl: './update-domaine.component.html',
  styleUrls: ['./update-domaine.component.css']
})
export class UpdateDomaineComponent implements OnInit {
  updateDomaineForm : FormGroup;
  domaine: Domaine = new Domaine();
  errorMessage: string = '';
  

  id:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
   
    private domaineServ: DomaineService,
    private location: Location,
    private formBuilder: FormBuilder,

  ) 
  { this.updateDomaineForm = this.formBuilder.group({
    nom: ['', [Validators.required, Validators.maxLength(10)]],
    description: ['', Validators.required]
  });
}

  ngOnInit(): void {
   this.id =this.route.snapshot.paramMap.get('id');
   this.domaineServ.getDomaine(this.id).subscribe(
    domaine => {
      this.domaine = domaine; 
    },
    error => {
      this.errorMessage = 'Une erreur est survenue lors de la récupération des données du domaine.';
    }
  );
  
  
   
    
  }

  
  updateDomaine(): void {
    console.log(this.id);
   
     
      const domaineData: Domaine = this.updateDomaineForm.value;
    this.domaineServ.updateDomaine(this.domaine,this.id).subscribe(
      updatedDomaine => {
        alert('Domaine mis à jour avec succès !');
        this.router.navigate(['/domaines']);
        
      }
      );
     
    
 
  }
  goBack(): void {
    this.location.back();
  }
}