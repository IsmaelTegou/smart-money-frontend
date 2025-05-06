import { Component } from '@angular/core';
import {TabPanel, TabView} from 'primeng/tabview';
import { CategoryPageComponent } from "../category-page/category-page.component";

@Component({
  selector: 'app-category-tabs',
  imports: [
    TabView,
    TabPanel,
    CategoryPageComponent
],
  templateUrl: './category-tabs.component.html',
  styleUrl: './category-tabs.component.scss'
})
export class CategoryTabsComponent {

}
