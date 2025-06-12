import {Component, inject, Inject, Input, OnInit} from '@angular/core';
import {TransactionResponseDTO} from '../../../models/transaction-response-dto';
import {TransactionService} from '../../../services/transaction.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {TransactionItemComponent} from '../transaction-item/transaction-item.component';
import {ActionComponent} from '../../../shared/action/action.component';
import {Button} from 'primeng/button';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Table, TableModule} from 'primeng/table';
import { Column } from '../../../enums/column';

@Component({
  selector: 'app-transaction-page',
  imports: [
    ActionComponent,
    Button,
    CurrencyPipe,
    DatePipe,
    IconField,
    InputIcon,
    InputText,
    TableModule,
  ],
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.scss'
})
export class TransactionPageComponent implements OnInit{
  @Input() type?: 'EXPENSE' | 'INCOME';
  transactions: TransactionResponseDTO[] = [];
  public cols: Column[] = [];
  public globalFilterFields: string[] = [];

  private service: TransactionService = inject(TransactionService);

  constructor(
    //private service: TransactionService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.setupCols();
    this.load();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  load() {
    this.service.getAll(this.type).subscribe((data:any) => this.transactions = data);
  }

  openCreate() {
    const ref = this.dialogService.open(TransactionItemComponent, {
      header: 'Nouvelle transaction',
      closable: true,
      width: '40vw',
      modal: true,
      data: { type: this.type }
    });
    ref.onClose.subscribe((res: boolean) => res && this.load());
  }

  openEdit(tx: TransactionResponseDTO) {
    const ref = this.dialogService.open(TransactionItemComponent, {
      header: 'Éditer transaction',
      closable: true,
      width: '40vw',
      modal: true,
      data: { transaction: tx, 
              type: tx.amount>0? 'INCOME':'EXPENSE',
              amount: tx.amount>0? tx.amount: -tx.amount }
    });
    ref.onClose.subscribe((res: boolean) => res && this.load());
  }

  delete(tx: TransactionResponseDTO) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment supprimer cette transaction ("+tx.note+")?",
      header: "Confirmation de suppression",
      accept: (): void=> {
        this.service.delete(tx.id).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Supprimé', detail: 'Transaction supprimée'});
          this.load();
        });
      }
    });
  }

  private setupCols(): void {
    this.cols = [
      {field: 'note', header: 'Note'},
      {field: 'categoryName', header: 'Category'},
      {field: 'amount', header: 'Montant'},
      {field: 'date', header: 'Date'}
    ];
    this.globalFilterFields = ['note', 'amount', 'categoryName'];
  }

}