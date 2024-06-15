import { Component, OnInit } from '@angular/core';  
import { FormControl, FormGroup, Validators } from '@angular/forms';  
import { SupportService } from '../services/support.service';
import { Support } from '../models/support.model';
import { User } from '../shared/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  //constructor(private supportService: SupportService,private token : TokenStorageService) { }  
  constructor(private supportService: SupportService, private route: ActivatedRoute , private router: Router ) { }  
  
  submitted = false;  
  
  ngOnInit() {  
    this.submitted = false;  
  }  
  
  supportsaveform = new FormGroup({  
    titre: new FormControl('', [Validators.required]),  
    description: new FormControl('', [Validators.required, Validators.minLength(10)])  
  });
  
  
  saveSupport() {  
    const support: Support = { 
      titre: this.supportsaveform.get('titre')!.value!,  
      description: this.supportsaveform.get('description')!.value! , 
      dateReclamation: new Date(),
      user: new User(),
    };


    this.submitted = true;  
    this.save(support);  
  }
  
  save(support: Support) {  
    //support.user = this.token.getUser()
   
    this.supportService.createSupport(support)  
      .subscribe(
       
        data => console.log(data,('Réclamation supprimée avec succès.') , console.log("yekdem ")), 
        error => console.log(error)
        
      );  
    this.supportsaveform.reset();  
    this.router.navigate(['/list']);
  }
  
  get Supporttitre() {  
    return this.supportsaveform.get('titre');  
  }  
  
  get SupportDescription() {  
    return this.supportsaveform.get('description');  
  }  
  
  addSupportForm() {  
    this.submitted = false;  
    this.supportsaveform.reset();  
  }  
}
