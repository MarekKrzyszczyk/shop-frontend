import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AdminProductService} from "./admin-product.service";
import {startWith, switchMap} from "rxjs";
import {AdminProduct} from "./adminProduct";
import {AdminConfirmDialogService} from "../admin-confirm-dialog.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "price", "actions"];
  totalElement: number = 0;
  data: AdminProduct[] = [];

  constructor(private adminProductService: AdminProductService,
              private adminConfirmDialogService: AdminConfirmDialogService) {
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.totalElement = data.totalElements;
      this.data = data.content;
    })
  }

  confirmDelete(element: AdminProduct): void {
    this.adminConfirmDialogService.openConfirmDialog("Are you sure you want to remove this product?")
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.adminProductService.delete(element.id)
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
