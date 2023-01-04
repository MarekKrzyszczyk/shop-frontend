import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminReview} from "./model/adminReview";
import {AdminReviewService} from "./admin-review.service";
import {AdminConfirmDialogService} from "../common/service/admin-confirm-dialog.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {
  displayedColumns: string[] = ["authorName", "content", "moderated", "actions"];
  data: AdminReview[] = [];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private adminReviewService: AdminReviewService,
              private dialogService: AdminConfirmDialogService) {
  }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.adminReviewService.getReviews()
    .subscribe(reviews => this.data = reviews);
  }

  acceptReview(element: AdminReview) {
    this.dialogService.openConfirmDialog('Are you sure you want to accept this review?')
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.adminReviewService.acceptReview(element.id).subscribe(
          () => {
          this.data.forEach((value, index) => {
            if (element === value) {
              element.moderated = true;
            }
          });
        });
      }
    });
  }

  deleteReview(element: AdminReview) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this review?')
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.adminReviewService.deleteReview(element.id).subscribe(
          () => {
          this.data.forEach((value, index) => {
            if (element === value) {
              this.data.splice(index, 1);
              this.table.renderRows();
            }
          });
        });
      }
    });
  }

}
