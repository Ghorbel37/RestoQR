import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.css']
})
export class CreateArticleModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
