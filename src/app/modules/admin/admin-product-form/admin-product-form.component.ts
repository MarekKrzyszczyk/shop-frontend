import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-product-form',
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field>
        <mat-label>Product name</mat-label>
        <input matInput placeholder="Enter product name" formControlName="name">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput rows="5" placeholder="Enter product desc" formControlName="description"></textarea>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Category</mat-label>
        <input matInput placeholder="Enter product category" formControlName="category">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Price</mat-label>
        <input matInput placeholder="Enter product price" formControlName="price">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Currency</mat-label>
        <input matInput placeholder="Enter product currency" formControlName="currency">
      </mat-form-field>

      <div fxFlexAlign="end">
        <button mat-flat-button color="primary">Save</button>
      </div>
    </div>`
})
export class AdminProductFormComponent {

  @Input() parentForm!: FormGroup;

}
