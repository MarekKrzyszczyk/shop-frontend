import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FullpageadminemptyComponent} from "./fullpageadminempty.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AdminLoginComponent} from "../../modules/admin/admin-login/admin-login.component";


@NgModule({
  declarations: [
    FullpageadminemptyComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminemptyModule {
}
