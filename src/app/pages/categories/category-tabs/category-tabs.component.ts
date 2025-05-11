import { Component } from '@angular/core';
import {TabPanel} from 'primeng/tabs';
import { CategoryPageComponent } from "../category-page/category-page.component";
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-tabs',
  imports: [
    TabPanel,
    CategoryPageComponent,
    TabsModule,
    CommonModule,
],
  templateUrl: './category-tabs.component.html',
  styleUrl: './category-tabs.component.scss'
})
export class CategoryTabsComponent {

}
