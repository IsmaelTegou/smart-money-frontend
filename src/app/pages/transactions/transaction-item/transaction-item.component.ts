import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Select} from 'primeng/select';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {TransactionService} from '../../../services/transaction.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {TransactionResponseDTO} from '../../../models/transaction-response-dto';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-transaction-item',
  imports: [
    Select,
    ReactiveFormsModule,
    NgIf,
    InputText,
    Button,
    Divider
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent implements OnInit, OnDestroy {
  transactionForm!: FormGroup;
  isSaving = false;
  today: string= new Date().toISOString().split('T')[0];
  categoryOptions: Category[] = [];
  typeOptions = [
    { label: 'Dépense', value: 'EXPENSE' },
    { label: 'Revenu', value: 'INCOME' }
  ];

  private transactionService: TransactionService = inject(TransactionService);

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    //private transactionService: TransactionService,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    const data: TransactionResponseDTO = this.dialogConfig.data.transaction;
    const type: 'INCOME' | 'EXPENSE' = this.dialogConfig.data.type;

    this.transactionForm = this.fb.group({
      id: [data?.id || null],
      type: [type, Validators.required],
      categoryId: [data?.categoryId, Validators.required],
      amount: [data?.amount<0 ?Math.abs(data?.amount):data?.amount || null, [Validators.required, Validators.min(0.01)]],
      note: [data?.note || ''],
      date: [data?.date || this.today , Validators.required]
    });

    if (type) {
      this.loadCategories(this.transactionForm.value.type);
    }
  }

  onTypeChange(type: 'EXPENSE' | 'INCOME') {
    this.transactionForm.patchValue({ categoryId: null });
    this.loadCategories(type);
  }

  onCategoryChange(id: string){
    const cat = this.categoryOptions.filter(c=>c.id===id);
    if(cat.length>0){
      this.transactionForm.patchValue({ amount: cat[0].plannedInMonth });
    }
  }

  loadCategories(type: 'EXPENSE' | 'INCOME') {
    this.categoryService.getCategoriesByType(type).subscribe({
      next: (categories: Category[]) => {
        this.categoryOptions = categories;
      }
    });
  }

  submit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValue = this.transactionForm.value;

    if (formValue.id) {
      console.log(formValue);
      this.transactionService.update(formValue.id, formValue).subscribe({
        next: (res:any) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Transaction mise à jour' });
          this.isSaving = false;
          this.dialogRef.close(res);
        }
      });
    } else {
      this.transactionService.create(formValue).subscribe({
        next: (res:any) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Transaction enregistrée' });
          this.isSaving = false;
          this.dialogRef.close(res);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }
}
