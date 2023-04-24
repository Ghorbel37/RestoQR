import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article, Categorie } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-update-article-modal',
  templateUrl: './update-article-modal.component.html',
  styleUrls: ['./update-article-modal.component.css']
})
export class UpdateArticleModalComponent implements OnInit {
  fileName: string;
  categories: Categorie[];
  article: Article;

  constructor(
    public dialogRef: MatDialogRef<UpdateArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.articleService.getAllCategories().subscribe({
      next: (result) => this.categories = result,
    })
    this.article = this.data[0];
    this.categories = this.data[1];
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

      page.article.image = myReader.result.toString();

    }
    myReader.readAsDataURL(file);
  }
}
