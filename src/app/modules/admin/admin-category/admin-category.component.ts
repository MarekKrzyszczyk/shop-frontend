import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminCategoryNameDto} from "../common/dto/adminCategoryNameDto";
import {AdminCategoryService} from "./admin-category.service";
import {AdminConfirmDialogService} from "../admin-confirm-dialog.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "actions"];
  data: Array<AdminCategoryNameDto> = [];

  constructor(private adminCategoryService: AdminCategoryService,
              private adminConfirmDialogService: AdminConfirmDialogService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.adminCategoryService.getCategories().subscribe(
      categories => this.data = categories
    );
  }


  confirmDelete(element: AdminCategoryNameDto): void {
    this.adminConfirmDialogService.openConfirmDialog("Are you sure you want to remove this category?")
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.adminCategoryService.delete(element.id)
        .subscribe(() => {
          this.data.forEach((value, index) => {
            if (element == value) {
              this.data.splice(index, 1);
              this.table.renderRows();
            }
          })
        });
      }
    })
  }
}
