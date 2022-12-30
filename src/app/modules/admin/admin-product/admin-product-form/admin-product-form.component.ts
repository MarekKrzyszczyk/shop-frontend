import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AdminCategoryNameDto} from "../../common/dto/adminCategoryNameDto";
import {FormCategoryService} from "./form-category.service";

@Component({
  selector: 'app-admin-product-form',
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field>
        <mat-label>Product name</mat-label>
        <input matInput placeholder="Enter product name" formControlName="name">
        <div *ngIf="name?.invalid && (name?.dirty || name?.touched)">
          <div class="errorMessages">Name is required</div>
        </div>
      </mat-form-field>
      <mat-form-field>
        <mat-label>User-friendly url</mat-label>
        <input matInput placeholder="Enter url" formControlName="slug">
        <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)">
          <div class="errorMessages">Slug is required</div>
        </div>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput rows="5" placeholder="Enter product desc" formControlName="description"></textarea>
        <div *ngIf="description?.invalid && (description?.dirty || description?.touched)">
          <div class="errorMessages">Description is required</div>
        </div>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Full description</mat-label>
        <textarea matInput rows="5" placeholder="Enter product desc" formControlName="fullDescription"></textarea>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Category</mat-label>
        <mat-select formControlName="categoryId">
          <mat-option *ngFor="let category of categories" [value]="category.id">
            {{category.name}}
          </mat-option>
        </mat-select>
        <div *ngIf="categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)">
          <div class="errorMessages">Category is required</div>
        </div>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Price</mat-label>
        <input matInput placeholder="Enter product price" formControlName="price">
        <div *ngIf="price?.invalid && (price?.dirty || price?.touched)">
          <div *ngIf="price?.errors?.['required']" class="errorMessages">Price is required</div>
          <div *ngIf="price?.errors?.['min']" class="errorMessages">Price must be equal or greater then 0</div>
        </div>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Currency</mat-label>
        <input matInput placeholder="Enter product currency" formControlName="currency">
        <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)">
          <div class="errorMessages">Currency is required</div>
        </div>
      </mat-form-field>

      <div fxFlexAlign="end">
        <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Save</button>
      </div>
    </div>`,
  styles: [`
    .errorMessages {
      color: red;
    }
  `]
})
export class AdminProductFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  categories: Array<AdminCategoryNameDto> = [];

  constructor(private formCategoryService: FormCategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.formCategoryService.getCategories().subscribe(
      categories => this.categories = categories
    );
  }

  get name() {
    return this.parentForm.get("name");
  }

  get description() {
    return this.parentForm.get("description");
  }

  get fullDescription() {
    return this.parentForm.get("fullDescription");
  }

  get categoryId() {
    return this.parentForm.get("categoryId");
  }

  get price() {
    return this.parentForm.get("price");
  }

  get currency() {
    return this.parentForm.get("currency");
  }

  get slug() {
    return this.parentForm.get("slug");
  }
}
