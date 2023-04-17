import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.css']
})
export class CreateArticleModalComponent {
  article: Article = new Article();
  fileName: string;

  constructor(
    public dialogRef: MatDialogRef<CreateArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var page = this;

    myReader.onloadend = function (e) {
      page.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      // console.log(myReader.result);
      page.article.image = myReader.result.toString();

    }
    myReader.readAsDataURL(file);
  }

}
