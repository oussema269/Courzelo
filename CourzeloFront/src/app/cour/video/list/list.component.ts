import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/service/video.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  videoTitle!:any;
  videoUrl: any;

  constructor(private videoService: VideoService , private ac:ActivatedRoute ) { }

  ngOnInit(): void {
    this.videoTitle =this.ac.snapshot.paramMap.get('nomVideo');
    this.loadVideo();
  }

  loadVideo(): void {
    this.videoService.getVideo(this.videoTitle).subscribe(
      response => {
        if (response instanceof Blob) {
          this.videoUrl = URL.createObjectURL(response);
        } else {
          console.error('Unexpected response format.');
        }
      },
      error => {
        console.log(this.loadVideo)
        console.error('Error loading video:', error);
        // Gérez l'erreur selon vos besoins (par exemple, afficher un message à l'utilisateur)
      }
    );
  }
}
