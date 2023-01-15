import {Component, OnInit} from '@angular/core';
import {AdminOrderService} from "../admin-order.service";
import {ActivatedRoute} from "@angular/router";
import {AdminOrder} from "../model/adminOrder";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

  order!: AdminOrder;
  formGroup!: FormGroup;
  statuses!: Map<string, string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getOrder();
    this.getInitData();
    this.formGroup = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    });
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => {
        this.order = order;
        this.formGroup.setValue({
          orderStatus: order.orderStatus
        });
        order.orderLogs.sort(
          (log, log2) => new Date(log2.created).getTime() - new Date(log.created).getTime())
      });
  }

  changeStatus() {
    this.adminOrderService.saveStatus(this.order.id, this.formGroup.value)
      .subscribe();
  }

  private getInitData() {
    this.adminOrderService.getInitData().subscribe(
      value => this.statuses = value.orderStatuses);
  }
}
