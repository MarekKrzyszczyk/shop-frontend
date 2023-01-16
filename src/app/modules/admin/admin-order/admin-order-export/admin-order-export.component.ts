import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminOrderService} from "../admin-order.service";

@Component({
  selector: 'app-admin-order-export',
  templateUrl: './admin-order-export.component.html',
  styleUrls: ['./admin-order-export.component.scss']
})
export class AdminOrderExportComponent implements OnInit {
  formGroup!: FormGroup;
  statuses = [];

  constructor(private formBuilder: FormBuilder,
              private adminOrderService: AdminOrderService) {
  }

  ngOnInit(): void {
    this.getInitData();
    this.formGroup = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      orderStatus: ['', Validators.required]
    });
  }

  export(): void {
    if (this.formGroup.valid) {
      let from = this.formGroup.get("from")?.value.toISOString();
      let to = this.formGroup.get("to")?.value.toISOString();
      let orderStatus = this.formGroup.get("orderStatus")?.value;
      this.adminOrderService.exportOrders(from, to, orderStatus).subscribe(
        response => {
          let a = document.createElement('a');
          let objectUrl = URL.createObjectURL(response.body);
          a.href = objectUrl;
          a.download = response.headers.get("Content-Disposition");
          a.click();
          URL.revokeObjectURL(objectUrl);
        }
      );
    }
  }

  getInitData(): void {
    this.adminOrderService.getInitData()
      .subscribe(value => this.statuses = value.orderStatuses)
  }

}
