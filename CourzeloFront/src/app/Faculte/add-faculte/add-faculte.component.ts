import { Component, OnInit } from '@angular/core';
import { FaculteService } from '../FaculteService/faculte.service';
import { Faculte } from '../FaculteClass/faculte';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PoleClass } from 'src/app/Pole/PoleClass/pole-class';

@Component({
  selector: 'app-add-faculte',
  templateUrl: './add-faculte.component.html',
  styleUrls: ['./add-faculte.component.css']
})
export class AddFaculteComponent implements OnInit {
   faculteId: string="";
  generateRandomString = (num: number | undefined) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = Math.random().toString(36).substring(0, num);
    return result1;
  }
  Facultesaveform= new FormGroup({
    nom: new FormControl('',Validators.required),
    adresse: new FormControl('',Validators.required),
    telephone: new FormControl('',[Validators.required,Validators.minLength(8)]),
    description: new FormControl('',Validators.required),
    photoUrl: new FormControl()

  });
  
  faculte: Faculte={
    codeFaculte: '',
    nom: '',
    adresse: '',
    telephone: 0,
    description: '',
    photoUrl: '',
    // pole:'',
    users :[]
   
  };
  submitted = false;

  constructor(private faculteService : FaculteService, private router: Router, private route :  ActivatedRoute ){}
  
  saveFaculte():void{
    if(this.Facultesaveform.invalid){
      return;}
      const data ={
        nom: this.Facultesaveform.get('nom')!.value,
        adresse: this.Facultesaveform.get('adresse')!.value,
        telephone: this.Facultesaveform.get('telephone')!.value,
        description: this.Facultesaveform.get('description')!.value,
        photoUrl: this.Facultesaveform.get('photoUrl')!.value
      } ;
      this.faculteService.addFaculteToPole(this.faculteId,data).subscribe({
        next: (res)=>{
          console.log(res);
          this.submitted=true;
          this.router.navigateByUrl(`/uploadFacultePhoto/${res.codeFaculte}`);
        },
        error: (e) => console.error(e)
      });

  }
  newFaculte(): void{
    this.submitted=false;
    this.faculte = {
      codeFaculte: '',
      nom:'',
      adresse:'',
      telephone:0,
      description:'',
      photoUrl:'',
      users :[]
      

    }
  }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.faculteId = params['id'];
      console.log('Faculte ID:', this.faculteId);
    });
  }
  

}
