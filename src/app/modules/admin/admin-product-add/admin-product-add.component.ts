import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminProductAddService} from "./admin-product-add.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AdminMessageService} from "../admin-message.service";
import {AdminProductUpdate} from "../admin-product-update/model/adminProductUpdate";

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

  productForm!: FormGroup;
  imageForm!: FormGroup;
  requiredFileTypes: string = "image/jpeg, image/png";
  image: string | null = null;

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
      fullDescription: [''],
      categoryId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required],
      slug: ['', Validators.required],
    });

    this.imageForm = this.formBuilder.group({
      file: ['']
    });
  }

  submit() {
    this.service.saveProduct({
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      fullDescription: this.productForm.get('fullDescription')?.value,
      categoryId: this.productForm.get('categoryId')?.value,
      price: this.productForm.get('price')?.value,
      currency: this.productForm.get('currency')?.value,
      image: this.image,
      slug: this.productForm.get('slug')?.value
    } as AdminProductUpdate)
      .subscribe(
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

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value)
    this.service.uploadImage(formData)
    .subscribe(result => this.image = result.filename);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0]
      });
    }
  }
}
