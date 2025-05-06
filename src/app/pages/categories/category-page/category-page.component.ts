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
    Button
  ],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent implements OnInit {
  categories!: Category[];
  public globalFilterFields: string[] = [];
  @Input({required: true}) type: 'EXPENSE' | 'INCOME' = 'EXPENSE';
  public cols: Column[] = [];

  constructor(private categoryService: CategoryService) {}

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ngOnInit(): void {
    this.setupCols();
    this.getByType(this.type);
  }

  getByType(type: string){
    this.categoryService.getCathegoryByType(type).subscribe({
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


  // ngOnInit(): void {
  //   this.categoryService.getAllCategories().subscribe((data: Category[]): void =>{
  //     this.categories = data;
  //   })
  // }


}
