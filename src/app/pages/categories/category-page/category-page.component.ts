import {Component, Input, OnInit} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Column } from '../../../enums/column';
import {TagModule} from 'primeng/tag';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CategoryItemComponent } from '../category-item/category-item.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActionComponent } from "../../../shared/action/action.component";


@Component({
  selector: 'app-category-page',
  imports: [
    TableModule,
    CurrencyPipe,
    DatePipe,
    TagModule,
    IconField,
    InputIcon,
    InputText,
    Button,
    ActionComponent
],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent implements OnInit {
  categories!: Category[];
  public globalFilterFields: string[] = [];
  @Input({required: true}) type: 'EXPENSE' | 'INCOME' = 'EXPENSE';
  public cols: Column[] = [];
  private ref!: DynamicDialogRef;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoryService: CategoryService, private dialogService: DialogService) {}

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ngOnInit(): void {
    this.setupCols();
    this.getByType(this.type);
  }

  getByType(type: string){
    this.categoryService.getCategoriesByType(type).subscribe({
      next: data => {
        this.categories = data;
      }
    })
  }

  private setupCols(): void {
    this.cols = [
      {field: 'name', header: 'Nom'},
      {field: 'plannedInMonth', header: 'Planifie par mois'},
      {field: 'type', header: 'Type'},
      {field: 'createdDateTime', header: 'Cree le'},
    ];
    //this.globalFilterFields = this.cols.map((col) => col.field);  prend tous les champs en compte
    this.globalFilterFields = ['name', 'plannedInMonth', 'type'];
  }

  openAddDialog(): void {
    this.ref = this.dialogService.open(CategoryItemComponent, {
      header: "Nouvelle categorie",
      closable: true,
      modal: true,
      width: '40vw',
      data: {type: this.type}
    })

    this.ref.onClose.subscribe((created: Category):void => {
      if(created){
        this.categories.unshift(created);
      }
    })
  }

  editCategory(category: Category): void {
    this.ref = this.dialogService.open(CategoryItemComponent, {
      header: "Editer categorie",
      closable: true,
      modal: true,
      width: '40vw',
      data: category
    })

    this.ref.onClose.subscribe((updated: Category):void => {
      if(updated){
        this.categories = this.categories.map(c => (c.id===updated.id? updated: c));
      }
    })
  }

  deleteCategory(category: Category): void {
    this.confirmationService.confirm({
      message: "Voulez-vous vraiment supprimer la categorie ("+category.name+") ?",
      header: "Confirmation de suppression",
      accept: (): void => {
        this.categoryService.deleteCategory(category.id).subscribe({
          next: (): void => {
            this.categories = this.categories.filter(c => c.id!==category.id);
            this.messageService.add({severity: 'info', summary: 'Succes', detail: 'Categorie supprimee'});
          }
        });
      },
      icon: 'pi pi-exclamation-triangle'
    });
    
  }


  // ngOnInit(): void {
  //   this.categoryService.getAllCategories().subscribe((data: Category[]): void =>{
  //     this.categories = data;
  //   })
  // }


}
