import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportService } from '../services/support.service';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {
  reclamationList: any[] = [];
  searchQuery: string = ''; // Initialize search query variable

  constructor(private router: Router, public shared: SupportService) {}

  ngOnInit(): void {
    this.getReclamationList();
  }

  getReclamationList(): void {
    this.shared.getAllSupports().subscribe(
      (data) => {
        this.reclamationList = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des réclamations : ', error);
      }
    );
  }

  navigateToUpdatePage(reclamationId: string): void {
    this.router.navigate(['/update', reclamationId]); // Pass reclamationId as a route parameter
  }

  deleteReclamation(id: string): void {
    this.shared.deleteSupport(id).subscribe(
      () => {
        this.reclamationList = this.reclamationList.filter(reclamation => reclamation.reclamationId !== id);
        console.log('Réclamation supprimée avec succès.');
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de la réclamation : ', error);
      }
    );
  }

  searchReclamations(): void {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.shared.searchReclamationsByTitle(this.searchQuery).subscribe(
        (data) => {
          this.reclamationList = data;
          this.searchQuery = ''; // Clear the search query after successful search
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la recherche des réclamations : ', error);
        }
      );
    } else {
      console.log('Veuillez saisir un titre de réclamation valide.');
    }
  }

  getReclamationsSort(): void {
    this.shared.getAllReclamationsSort().subscribe(
      (data) => {
        this.reclamationList = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du tri des réclamations : ', error);
      }
    );
  }
}
