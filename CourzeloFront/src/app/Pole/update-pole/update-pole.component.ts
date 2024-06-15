import { Component } from '@angular/core';
import { PoleClass } from '../PoleClass/pole-class';
import { PoleServiceService } from '../PoleServices/pole-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-pole',
  templateUrl: './update-pole.component.html',
  styleUrls: ['./update-pole.component.css']
})
export class UpdatePoleComponent {
  pole! : PoleClass;
  feedback: any={};
  constructor(private poleservice: PoleServiceService, private route:ActivatedRoute, private router : Router){}
ngOnInit(){
  this.route.params.subscribe(params=>{
    const poleId=params['id'];
    if (poleId=='new'){
      this.pole=new PoleClass();
      this.feedback={};

    } else{
      this.poleservice.getPole(poleId).subscribe({
        next: (pole) => {
          this.pole = pole;
          this.feedback = {};
        },
        error: () => {
          this.feedback = { type: 'warning', message: 'Error loading' };
        }
      });
    }
  });
}

save() {
  const id = this.pole.codePole;

  this.poleservice.updatePole(id, this.pole).subscribe({
    next: () => {
      this.feedback = { type: 'success', message: 'Save was successful!' };
      setTimeout(async () => {
        await this.router.navigate(['/getAllPoles']);
      }, 1000);
    },
    error: () => {
      this.feedback = { type: 'error', message: 'Error saving' };
    }
  });
}

async cancel() {
  await this.router.navigate(['/getAllPoles']);
}

}











