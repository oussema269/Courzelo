import { Component } from '@angular/core';
import { Faculte } from '../FaculteClass/faculte';
import { FaculteService } from '../FaculteService/faculte.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-faculte',
  templateUrl: './edit-faculte.component.html',
  styleUrls: ['./edit-faculte.component.css']
})
export class EditFaculteComponent  {
  faculte!: Faculte;
  feedback: any={};
  constructor(private faculteservice: FaculteService, private route:ActivatedRoute, private router : Router){}
ngOnInit(){
  this.route.params.subscribe(params=>{
    const faculteId=params['id'];
    if (faculteId=='new'){
      this.faculte=new Faculte();
      this.feedback={};

    } else{
      this.faculteservice.getFaculte(faculteId).subscribe({
        next: (faculte) => {
          this.faculte = faculte;
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
  const id = this.faculte.codeFaculte;

  this.faculteservice.updateFaculte(id, this.faculte).subscribe({
    next: () => {
      this.feedback = { type: 'success', message: 'Save was successful!' };
      setTimeout(async () => {
        await this.router.navigate(['/getAllFacultes']);
      }, 1000);
    },
    error: () => {
      this.feedback = { type: 'error', message: 'Error saving' };
    }
  });
}

async cancel() {
  await this.router.navigate(['/getAllFacultes']);
}

}








