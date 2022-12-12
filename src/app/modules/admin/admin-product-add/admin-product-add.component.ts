import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminProductAddService} from "./admin-product-add.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AdminMessageService} from "../admin-message.service";

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
              private snackBar: MatSnackBar,
              private adminMessageService: AdminMessageService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required]
    });
  }

  submit() {
    this.service.saveProduct(this.productForm.value).subscribe(
      {
        next: product => {
          this.router.navigate(["/admin/products/update", product.id])
          .then(() => this.snackBar.open("Product was created", "", {duration: 3000}))
        },
        error: err => {
          this.adminMessageService.addSpringError(err.error);
        }
      }
    )
  }
}
