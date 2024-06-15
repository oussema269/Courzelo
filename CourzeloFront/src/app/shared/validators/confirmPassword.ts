import { FormGroup } from "@angular/forms";


export function MustMatch(controlName: string, matchingControlName : string){
 

    return (FormGroup: FormGroup) =>{
        // const control
        const control = FormGroup.controls[controlName];
        // const control 

        const matchingControl = FormGroup.controls[matchingControlName];
        if (control.value !== matchingControl.value) {
            //mustMatch recoit true c'est a dire oui il ya un prblm les deux mdp ne sont pas identiques 
            matchingControl.setErrors({mustMatch : true})
        } else{
         // pas de probleme pwd == cpwd
         matchingControl.setErrors(null);
        }

     
    }


}