import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-category-page',
  imports: [
    TableModule
  ],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {
  categories: Category[] = [
    {
      id: "b7e0a704-685c-43d5-9802-574c28b4165e",
      name: "Loyer",
      plannedInMonth: 15000,
      type: "EXPENSE",
      createdDateTime: "2025-04-23T09:50:46.949742"
    },
    {
      id: "7cf1d6e0-954d-4b62-aa96-0624bc69b2d4",
      name: "Alimentation",
      plannedInMonth: 30000,
      type: "EXPENSE",
      createdDateTime: "2025-04-23T09:51:02.955138"
    },
    {
      id: "fdd29a97-fa5b-4600-b291-1ff4b7b9955f",
      name: "Imprevues",
      plannedInMonth: 10000,
      type: "EXPENSE",
      createdDateTime: "2025-04-23T09:51:25.437633"
    },
    {
      id: "067bc275-7801-4c88-9cc0-d4a4e421278f",
      name: "Factures",
      plannedInMonth: 5000,
      type: "EXPENSE",
      createdDateTime: "2025-04-23T09:51:50.839575"
    },
    {
      id: "5f777b3e-475b-456e-bdb2-a957d9897e8c",
      name: "Salaire",
      plannedInMonth: 100000,
      type: "INCOME",
      createdDateTime: "2025-04-23T09:52:28.311848"
    }
  ];

}
