import { Component } from '@angular/core';
import {TabPanel, TabsModule } from 'primeng/tabs';
import { TransactionPageComponent } from "../transaction-page/transaction-page.component";

@Component({
  selector: 'app-transaction-tabs',
  imports: [
    TabsModule,
    TabPanel,
    TransactionPageComponent
],
  templateUrl: './transaction-tabs.component.html',
  styleUrl: './transaction-tabs.component.scss'
})
export class TransactionTabsComponent {

}
