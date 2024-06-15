import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService } from '../services/support.service';
import { Support } from '../models/support.model';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class UpdateReclamationComponent implements OnInit {
  reclamationId: string = '';
  reclamation: Support | null = null;
  submitted = false;
  updateSupportForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private supportService: SupportService,
    private formBuilder: FormBuilder
  ) {
    this.updateSupportForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.reclamationId = params.get('id') || '';
      this.getReclamationById(this.reclamationId);
    });
  }

  getReclamationById(id: string): void {
    this.supportService.getReclamationById(id).subscribe(
      (data: Support) => {
        this.reclamation = data;
        this.updateSupportForm.patchValue({
          titre: data.titre || '',
          description: data.description || ''
        });
      },
      (error) => {
        console.error('Error getting reclamation by ID:', error);
      }
    );
  }

  updateSupport(): void {
    console.log('Updating support...');
    this.submitted = true;
    if (this.updateSupportForm.valid && this.reclamation) {
      const updatedReclamation: Support = {
        ...this.reclamation,
        titre: this.updateSupportForm.value.titre,
        description: this.updateSupportForm.value.description
      };
  
      this.supportService.updateSupport(updatedReclamation).subscribe({
        next: (data: any) => {
          console.log('Reclamation updated successfully!', data);
          this.submitted = false;
          this.updateSupportForm.reset(); // Reset the form after successful update
        },
        error: (error: any) => {
          console.error('Error updating reclamation:', error);
        }
      });
    }
  } }