import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_common/confirm-dialog/confirm-dialog.component';
import { CreateArticleModalComponent } from './create-article-modal/create-article-modal.component';
import { UpdateArticleModalComponent } from './update-article-modal/update-article-modal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  columnsToDisplay = ['libelle', 'description', 'prix', 'reference', 'duree', 'image', 'action'];
  existingArticles: Article[];
  article: Article = new Article();
  result: string = '';


  constructor(
    private articleService: ArticleService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {

  }
  ngOnInit(): void {
    this.refresh();
    this.notificationService.openSnackBar('Categories affichés')
  }

  refresh() {
    this.articleService.getAll().subscribe(data => {
      this.existingArticles = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  private saveArticle() {
    this.articleService.save(this.article).subscribe(data => {
      this.refresh();
      this.notificationService.openSnackBar("Article ajouté avec succés");
      this.article = new Article();
    });
  }

  // submit() {
  //   const dialogRef = this.dialog.open(CreateArticleModalComponent, { data: this.newArticle });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     this.newArticle = result;
  //     if (this.newArticle) {
  //       this.saveArticle();
  //       this.notificationService.openSnackBar("Article ajouté avec succés");
  //     }
  //     this.newArticle = new Article();
  //   })

  // }

  update(article: Article) {
    const dialogRef = this.dialog.open(UpdateArticleModalComponent, { data: article });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.article = result;
        this.articleService.update(this.article.idArticle, this.article);
        this.article = new Article();
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: "400px", data: new ConfirmDialogModel("Attention", "Êtes-vous sûr de vouloir supprimer") });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult) {
        this.articleService.delete(id).subscribe(data => {
          console.log(data);
          this.refresh();
          this.notificationService.openSnackBar("Element supprimé");
        });
      }
    });
  }

}
