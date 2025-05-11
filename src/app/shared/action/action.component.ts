import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Category } from '../../models/category';

@Component({
  selector: 'app-action',
  imports: [Button],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {

  @Input({required: true}) item!: Category;

  @Output() onEdit: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() onDelete: EventEmitter<Category> = new EventEmitter<Category>();

  edit(): void{
    this.onEdit.emit(this.item);
  }

  delete(): void {
    this.onDelete.emit(this.item);
  }
}
