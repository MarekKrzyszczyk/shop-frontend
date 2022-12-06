import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminProductAddService} from "./admin-product-add.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: AdminProductAddService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    })
  }

  submit() {
    this.service.saveProduct(this.productForm.value).subscribe(
      product => {
        this.router.navigate(["/admin/products/update", product.id])
          .then(() => this.snackBar.open("Product was created", "", {duration: 3000}))
      }
    )
  }
}