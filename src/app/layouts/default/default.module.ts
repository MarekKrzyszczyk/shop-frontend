import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from "./default.component";
import {ProductComponent} from "../../modules/product/product.component";
import {HomeComponent} from "../../modules/home/home.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from "../../shared/shared.module";
import {ProductDetailsComponent} from "../../modules/product-details/product-details.component";


@NgModule({
  declarations: [
    DefaultComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class DefaultModule { }
