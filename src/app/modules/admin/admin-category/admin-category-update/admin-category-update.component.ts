import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminCategoryService} from "../admin-category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../../admin-message.service";
import {AdminCategory} from "../model/AdminCategory";

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.scss']
})
export class AdminCategoryUpdateComponent {

  categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: AdminCategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private adminMessageService: AdminMessageService) {
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: [""],
      slug: ["", Validators.required],
    });
    this.getCategory();
  }

  getCategory() {
    this.service.getCategory(Number(this.route.snapshot.params['id']))
    .subscribe(category => this.mapToFormValues(category));
  }

  submit() {
    this.service.updateCategory(Number(this.route.snapshot.params['id']), this.categoryForm.value)
    .subscribe({
      next: category => {
        this.mapToFormValues(category);
        this.snackBar.open('Category was updated', '', {duration: 3000});
      },
      error: err => {
        this.adminMessageService.addSpringError(err.error);
      }
    });
  }

  private mapToFormValues(category: AdminCategory) {
    this.categoryForm.setValue({
      name: category.name,
      description: category.description,
      slug: category.slug
    });
  }
}
