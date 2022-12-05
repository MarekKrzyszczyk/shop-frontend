import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminProductUpdateService} from "./admin-product-update.service";
import {AdminProductUpdate} from "./model/adminProductUpdate";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminProduct} from "../admin-product/adminProduct";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getProduct();
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    })
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
    .subscribe(product => {
        this.productForm.setValue(AdminProductUpdateComponent.mapFormValues(product));
        this.snackBar.open("Product was updated", '', {duration: 3000})
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
