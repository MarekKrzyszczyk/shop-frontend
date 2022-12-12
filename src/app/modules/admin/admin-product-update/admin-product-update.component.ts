import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminProductUpdateService} from "./admin-product-update.service";
import {AdminProductUpdate} from "./model/adminProductUpdate";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminProduct} from "../admin-product/adminProduct";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../admin-message.service";

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent implements OnInit {
  product!: AdminProductUpdate;
  productForm!: FormGroup;

  constructor(private router: ActivatedRoute,
              private adminProductUpdateService: AdminProductUpdateService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private adminMessageService: AdminMessageService) {
  }

  ngOnInit(): void {
    this.getProduct();
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required]
    });
  }

  getProduct(): void {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id)
    .subscribe(product => this.productForm.setValue(AdminProductUpdateComponent.mapFormValues(product))
    );
  }

  submit(): void {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.savePost(id, this.productForm.value)
    .subscribe({
        next: product => {
          this.productForm.setValue(AdminProductUpdateComponent.mapFormValues(product));
          this.snackBar.open("Product was updated", '', {duration: 3000})
        },
      error: err => this.adminMessageService.addSpringError(err.error)
      }
    );
  }

  private static mapFormValues(product: AdminProductUpdate) {
    return {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      currency: product.currency
    };
  }
}
