import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-update-article-modal',
  templateUrl: './update-article-modal.component.html',
  styleUrls: ['./update-article-modal.component.css']
})
export class UpdateArticleModalComponent {
  fileName: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) { }

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

      page.data.image = myReader.result.toString();

    }
    myReader.readAsDataURL(file);
  }
}
