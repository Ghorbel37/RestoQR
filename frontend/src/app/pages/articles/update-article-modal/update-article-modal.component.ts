import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-update-article-modal',
  templateUrl: './update-article-modal.component.html',
  styleUrls: ['./update-article-modal.component.css']
})
export class UpdateArticleModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
