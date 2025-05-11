import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from '../../../models/category';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-category-item',
  imports: [NgIf, Button, ReactiveFormsModule, InputText],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent implements OnInit, OnDestroy {

  categoryForm!: FormGroup;
  isSaving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService
  ) {}

  ngOnDestroy(): void {
      if(this.dynamicDialogRef) {
        this.dynamicDialogRef.close();
      }
  }

  ngOnInit(): void {
      const data: Category = this.dynamicDialogConfig.data as Category;
      this.categoryForm = this.formBuilder.group({
        id: [data.id || null],
        name: [data.name || '', [Validators.required, Validators.minLength(2)]],
        plannedInMonth: [data.plannedInMonth || 0, [Validators.required, Validators.min(1)]],
        type: [data.type]
      })
  }

  submit(): void {
    if(this.categoryForm.invalid){
      this.categoryForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    if(this.categoryForm.value.id){
      this.categoryService.updateCategory(this.categoryForm.value.id, this.categoryForm.value).subscribe({ 
        next: (category: Category): void =>{
        this.messageService.add({severity: 'success', summary: 'Succes', detail: 'Categorie mise a jour'});
        this.isSaving = false;
        this.dynamicDialogRef.close(category);
      }
      }) 
    }else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (category: Category): void =>{
          this.messageService.add({severity: 'success', summary: 'Succes', detail: 'Categorie creee'})
          this.isSaving = false;
          this.dynamicDialogRef.close(category);
        }
      });
    }    
  }
}
