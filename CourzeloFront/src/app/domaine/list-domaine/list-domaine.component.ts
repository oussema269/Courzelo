import { Component, OnInit } from '@angular/core';
import { Domaine } from '../../models/domaine';

import { Router } from '@angular/router';
import { DomaineService } from '../../services/domaine.service';
import { FileService } from 'src/app/services/file.service';




@Component({
  selector: 'app-list-domaine',
  templateUrl: './list-domaine.component.html',
  styleUrls: ['./list-domaine.component.css']
})

export class ListDomaineComponent implements OnInit{

  domaines: any[]=[];
     filteredDomaines: any[]=[]; // Liste filtrée des domaines
   
    search: string = '';
  

  constructor(private domaineService: DomaineService,private router: Router,private photoservice:FileService) 
  { 
  

   
  }

  ngOnInit(): void {
    this.getDomaines();

   
    
    
  }


  getDomaines(): void {
    this.domaineService.findAll()
      .subscribe(domaines => this.domaines = domaines);
  }
  editDomaine(id: string): void {
    this.router.navigate(['/update-domaine', id]);
  }
  deleteDomaine(id: string): void {
    this.router.navigate(['/deleteDomain',id ]);
  }
  uploadimg(id: string): void {
    this.router.navigate(['/uploadimg',id ]);
  }
  getBlogPhotoUrl(domaine:Domaine): string {
    // Construct the image URL based on the backend API endpoint
    return this.photoservice.getPhoto(domaine.photo);
  }
  
  
}


