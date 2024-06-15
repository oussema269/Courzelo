import { Component, OnInit } from '@angular/core';
import { Domaine } from '../../models/domaine';


import { ActivatedRoute, Router } from '@angular/router';
import { DomaineService } from '../../services/domaine.service';



@Component({
  selector: 'app-delete-domaine',
  templateUrl: './delete-domaine.component.html',
  styleUrls: ['./delete-domaine.component.css']
})
export class DeleteDomaineComponent implements OnInit{
id:any
  
  constructor( private route: ActivatedRoute,
    private router: Router,
    private domaineService: DomaineService) { }
  ngOnInit(): void {
    this.id =this.route.snapshot.paramMap.get('id');
   
    
     
  }
  cancelDelete(): void {
    this.router.navigate(['/domaines']);
  }
   
    confirmDelete(): void {
    
        this.domaineService.deleteDomaine(this.id).subscribe(
          () => {
            alert('Domaine supprimé avec succès !');
            this.router.navigate(['/domaines']);
          },
          error => {
            alert('Une erreur est survenue lors de la suppression du domaine :');
          }
        );
      } 
    
    }
  