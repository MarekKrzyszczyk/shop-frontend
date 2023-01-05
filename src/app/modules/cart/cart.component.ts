import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "./cart.service";
import {CartSummary} from "./model/cartSummary";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartSummary!: CartSummary;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.queryParams['productId']);
    if (id > 0) {
      this.addToCart(id);
    } else {
      this.getCart();
    }
  }

  getCart() {
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.cartService.getCart(cartId)
      .subscribe(cartSummary => this.cartSummary = cartSummary);
    }
  }

  addToCart(id: number) {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
      .subscribe(cartSummary => {
        this.cartSummary = cartSummary;
        this.cookieService.delete("cartId");
        this.cookieService.set("cartId", cartSummary.id.toString(), this.expiresDays(3));
        this.router.navigate(["/cart"]);
      });
  }

  private expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
