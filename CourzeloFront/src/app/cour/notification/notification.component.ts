import { Component } from '@angular/core';
import { Notification } from 'src/app/model/Notification';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notification :any
  read:boolean=false;
  constructor(private CourseService:CourseService ){

  }
  ngOnInit() {
    this.notification=this.CourseService.getNotification().subscribe((data) => {
      this.notification = data;
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  }
  delete(id: string) {
    // Afficher la boîte de dialogue de confirmation
    const confirmed = window.confirm('Voulez-vous vraiment supprimer cette course ?');
    
    // Si l'utilisateur clique sur "Oui" dans la boîte de dialogue
    if (confirmed) {
      // Supprimer la course
      this.CourseService.deleteNotif(id).subscribe(
        () => {
          console.log(`La notif avec l'ID ${id} a été supprimée avec succès.`);
          // Actualiser la page après la suppression
          location.reload();
        },
        (error) => {
          console.error(`Erreur lors de la suppression de la course avec l'ID ${id} :`, error);
        }
      );
    } else {
      // Si l'utilisateur clique sur "Non" dans la boîte de dialogue
      console.log('Suppression de la course annulée.');
    }
  }
}
