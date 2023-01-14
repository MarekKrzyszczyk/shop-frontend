import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "./order.service";
import {CartSummary} from "../common/model/cart/cartSummary";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDto} from "./model/orderDto";
import {OrderSummary} from "./model/orderSummary";
import {InitData} from "./model/initData";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cartSummary!: CartSummary;
  orderSummary!: OrderSummary;
  formGroup!: FormGroup;
  initData!: InitData;
  errorMessage: boolean = false;

  constructor(private cookieService: CookieService,
              private orderService: OrderService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.checkCartEmpty();
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      shipment: ['', Validators.required],
      payment: ['', Validators.required]
    });
    this.getInitData();
  }

  checkCartEmpty(): void {
    let cartId = Number(this.cookieService.get("cartId"));
    this.orderService.getCart(cartId).subscribe(value => this.cartSummary = value);
  }

  submit() {
    if (this.formGroup.valid) {
      this.orderService.placeOrder({
        firstname: this.formGroup.get("firstname")?.value,
        lastname: this.formGroup.get("lastname")?.value,
        street: this.formGroup.get("street")?.value,
        zipcode: this.formGroup.get("zipcode")?.value,
        city: this.formGroup.get("city")?.value,
        email: this.formGroup.get("email")?.value,
        phone: this.formGroup.get("phone")?.value,
        cartId: Number(this.cookieService.get("cartId")),
        shipmentId: Number(this.formGroup.get("shipment")?.value.id),
        paymentId: Number(this.formGroup.get("payment")?.value.id)
      } as OrderDto)
      .subscribe({
        next: value => {
        this.orderSummary = value;
        this.cookieService.delete("cartId");
          this.errorMessage = false;
      },
        error: err => this.errorMessage = true
      });
    }
  }

  getInitData(): void {
    this.orderService.getInitData().subscribe(
      value => {
        this.initData = value;
        this.setDefaultShipment();
        this.setDefaultPayment();
      });
  }

  private setDefaultShipment() {
    this.formGroup.patchValue({"shipment": this.initData.shipments
      .filter(shipment => shipment.defaultShipment)[0]});
  }

  private setDefaultPayment() {
    this.formGroup.patchValue({"payment": this.initData.payments
        .filter(payment => payment.defaultPayment)[0]});
  }

  get firstname() {
    return this.formGroup.get("firstname");
  }

  get lastname() {
    return this.formGroup.get("lastname");
  }

  get street() {
    return this.formGroup.get("street");
  }

  get zipcode() {
    return this.formGroup.get("zipcode");
  }

  get city() {
    return this.formGroup.get("city");
  }

  get email() {
    return this.formGroup.get("email");
  }

  get phone() {
    return this.formGroup.get("phone");
  }

  get shipment() {
    return this.formGroup.get("shipment");
  }

}
