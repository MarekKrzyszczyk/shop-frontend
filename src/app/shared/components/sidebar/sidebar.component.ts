import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];

}
