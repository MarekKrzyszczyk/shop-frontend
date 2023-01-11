import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "./cart.service";
import {CartSummary} from "../common/model/cart/cartSummary";
import {CookieService} from "ngx-cookie-service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CartSummaryItem} from "../common/model/cart/cartSummaryItem";
import {CartIconService} from "../common/service/cart-icon.service";
import {Location} from '@angular/common';
import {CartCommonService} from "../common/service/cart-common.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartSummary!: CartSummary;
  formGroup!: FormGroup;
  private isProductAdded = false;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private cookieService: CookieService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cartIconService: CartIconService,
              private location: Location) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.queryParams['productId']);
    if (id > 0) {
      this.addToCart(id);
      this.isProductAdded = true;
    } else {
      this.getCart();
      this.isProductAdded = false;
    }

    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  getCart() {
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.cartService.getCart(cartId)
      .subscribe(cartSummary => {
        this.cartSummary = cartSummary;
        this.patchFormItems();
        this.cartIconService.cartChanged(cartSummary.items.length);
      });
    }
  }

  addToCart(id: number) {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
    .subscribe(cartSummary => {
      this.cartSummary = cartSummary;
      this.patchFormItems();
      this.cookieService.delete("cartId");
      this.cookieService.set("cartId", cartSummary.id.toString(), CartComponent.expiresDays(3));
      this.router.navigate(["/cart"]);
      this.cartIconService.cartChanged(cartSummary.items.length);
    });
  }

  submit(): void {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.updateCart(cartId, this.mapToRequestListDto())
    .subscribe(cartSummary => {
      this.cartSummary = cartSummary;
      this.formGroup.get("items")?.setValue(cartSummary.items);
    });
  }

  get items() {
    return (<FormArray>this.formGroup.get("items")).controls;
  }

  deleteItem(id: number): void {
    this.cartService.deleteCartItem(id).subscribe(() => this.ngOnInit());
  }

  private patchFormItems() {
    let formItems = <FormArray>this.formGroup.get("items");
    this.cartSummary.items.forEach(item => {
      formItems.push(this.formBuilder.group({
        id: [item.id],
        quantity: [item.quantity],
        productDto: [item.productDto],
        lineValue: [item.lineValue]
      }));
    })
  }

  private static expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  private mapToRequestListDto(): any[] {
    let items: Array<CartSummaryItem> = this.formGroup.get("items")?.value;
    return items.map(item => ({
      productId: item.productDto.id,
      quantity: item.quantity
    }));
  }

  back() {
    let stepsToGoBack = this.isProductAdded ? -2 : -1;
    this.location.historyGo(stepsToGoBack);
  }
}
