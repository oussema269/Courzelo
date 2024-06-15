import { Component, OnInit } from '@angular/core';
import { PoleClass } from '../PoleClass/pole-class';
import { PoleServiceService } from '../PoleServices/pole-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pole-list-front',
  templateUrl: './pole-list-front.component.html',
  styleUrls: ['./pole-list-front.component.css']
})
export class PoleListFrontComponent implements OnInit {
  poles: PoleClass[]=[];
  filteredPoles: PoleClass[] = [];
  searchInput: string = '';
   sortBy: keyof PoleClass = 'codePole';
// 

  constructor(private poleservice: PoleServiceService,private router:Router){}
  ngOnInit(): void {
    this.fetchPoles();
  }
  fetchPoles(): void {
    this.poleservice.getPoleList()
      .subscribe({
        next: (poles) => {
          this.poles = poles;
          this.filteredPoles = this.poles;
          this.sortPoles();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }  
  sortPoles(): void {
    // Sort the poles array based on the selected field and direction
    this.poles.sort((a, b) => {
      if (a[this.sortBy] < b[this.sortBy]) {
        return 1;
      } else if (a[this.sortBy] > b[this.sortBy]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  
  // Update the sorting field and call sortBlogs
  onSortChange(): void {
    this.sortPoles();
  }
   getPolePhotoUrl(pole: PoleClass): string {
    // Construct the image URL based on the backend API endpoint
     return this.poleservice.getPhoto(pole.photoUrl);
    
   }
  deletePole(pole: PoleClass): void {
    if(confirm("Are you sure you want to delete this question?")) {
    
     this.poleservice.deletePole(pole.codePole).subscribe(() => {
      
      
      this.poles = this.poles.filter((p) => p.codePole !== pole.codePole);
     });}
     this.fetchPoles();
 }
  navigateToUpdate(poleId: String): void {
    this.router.navigate(['/modifierPole/', poleId]);
  }
  navigateToAddPole() {
    this.router.navigate(['/addPole']);

   
  }
  

  onSearch(): void {
    console.log('Search Input:', this.searchInput);
    
    this.filteredPoles = this.poles.filter(pole =>
      pole.nom?.toLowerCase().includes(this.searchInput.toLowerCase())
      ||pole.adresse?.toLowerCase().includes(this.searchInput.toLowerCase()) 
      ||pole.description?.toLowerCase().includes(this.searchInput.toLowerCase())     
    );
    console.log('All Poles:', this.poles);
  }
  navigateToFaculte(poleId: string):void{
    this.router.navigate(['/getAllFacultes/', poleId]);
  }
  }
 
  
  
  


