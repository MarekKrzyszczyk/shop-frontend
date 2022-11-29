import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FullpageadminComponent} from "./fullpageadmin.component";
import {AdminComponent} from "../../modules/admin/admin.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class FullpageadminModule {
}
