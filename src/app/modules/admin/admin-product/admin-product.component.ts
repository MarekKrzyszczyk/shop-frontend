import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AdminProductService} from "./admin-product.service";
import {startWith, switchMap} from "rxjs";
import {AdminProduct} from "./adminProduct";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ["id", "name", "price", "actions"];
  totalElement: number = 0;
  data: AdminProduct[] = [];

  constructor(private adminProductService: AdminProductService) {
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

}
