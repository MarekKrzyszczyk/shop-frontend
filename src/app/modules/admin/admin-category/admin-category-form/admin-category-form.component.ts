import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-category-form',
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field>
        <mat-label>Category name</mat-label>
        <input matInput placeholder="Enter category name" formControlName="name">
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
        <textarea matInput rows="5" placeholder="Enter category desc" formControlName="description"></textarea>
        <div *ngIf="description?.invalid && (description?.dirty || description?.touched)">
          <div class="errorMessages">Description is required</div>
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
export class AdminCategoryFormComponent {

  @Input() parentForm!: FormGroup;

  constructor() {}

  get name() {
    return this.parentForm.get("name");
  }

  get description() {
    return this.parentForm.get("description");
  }

  get slug() {
    return this.parentForm.get("slug");
  }
}
