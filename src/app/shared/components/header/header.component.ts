import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HeaderService} from "./header.service";
import {CartIconService} from "../../../modules/common/service/cart-icon.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = "Shop";
  cartProductCounter = "";


  constructor(private cookieService: CookieService,
              private headerService: HeaderService,
              private cartIconService: CartIconService) {
  }

  ngOnInit(): void {
    this.getCountProducts();
    this.cartIconService.subject
      .subscribe(numberOfItems => this.cartProductCounter = String(numberOfItems > 0 ? numberOfItems : ""))
  }

  getCountProducts(): void {
    let cartId = Number(this.cookieService.get("cartId"));
    this.headerService.getCountProducts(cartId).subscribe(
      numberOfItems => this.cartProductCounter = String(numberOfItems > 0 ? numberOfItems : ""));
  }
}
