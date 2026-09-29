import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article, Categorie } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-update-article-modal',
  templateUrl: './update-article-modal.component.html',
  styleUrls: ['./update-article-modal.component.css']
})
export class UpdateArticleModalComponent implements OnInit {
  fileName: string;
  categories: Categorie[];
  article: Article;
  categorie: FormControl;
  idCategorie: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private articleService: ArticleService,
    private categorieService: CategorieService,
  ) { }

  ngOnInit(): void {
    this.article = this.data[0];
    this.categories = this.data[1];
    if (this.article.categorie) {
      this.idCategorie = this.article.categorie.idCategorie;
    }
  }

  close() {
    if (!this.idCategorie) {
      this.article.categorie = null;
    }
    else {
      this.article.categorie = new Categorie();
      this.article.categorie.idCategorie = this.idCategorie;
    }
    this.dialogRef.close(this.article);
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
