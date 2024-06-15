import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PoleClass } from '../PoleClass/pole-class';
import { PoleServiceService } from '../PoleServices/pole-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pole',
  templateUrl: './add-pole.component.html',
  styleUrls: ['./add-pole.component.css']
})
export class AddPoleComponent implements OnInit {
   Polesaveform= new FormGroup({
    nom: new FormControl('',Validators.required),
    adresse: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    photoUrl: new FormControl()

   });
   
   poleclass: PoleClass={
     codePole: '',
     nom: '',
     adresse: '',
     description: '',
     photoUrl: '',
     facultes :[]
    
   };
   
   submitted = false;
   constructor(private poleservice: PoleServiceService, private router : Router){}


   savePole():void{
    if(this.Polesaveform.invalid){
      return;
    }


    const data={
      nom:this.Polesaveform.get("nom")!.value,
      adresse: this.Polesaveform.get("adresse")!.value,
      description: this.Polesaveform.get("description")!.value,
      photoUrl: this.Polesaveform.get("photoUrl")!.value
    };


   this.poleservice.createPole(data).subscribe({
    next: (res)=>{
      console.log(res);
      this.submitted=true;
      this.router.navigateByUrl(`/uploadPolePhoto/${res.codePole}`);

    },
      
    error: (e) => console.error(e)
   });
   }

   
   newPole(): void{
    this.submitted=false;
    this.poleclass = {
      codePole: '',
      nom:'',
      adresse:'',
      description:'',
      photoUrl:'',
      facultes :[]
      
    }
  }
    
  ngOnInit(): void {


    throw new Error('Method not implemented.');
  }

}
