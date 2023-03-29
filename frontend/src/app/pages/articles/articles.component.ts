import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_common/confirm-dialog/confirm-dialog.component';
import { CreateArticleModalComponent } from './create-article-modal/create-article-modal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  columnsToDisplay = ['libelle', 'description', 'prix', 'image', 'action'];
  existingArticles: Article[];
  newArticle: Article = new Article();
  result: string = '';
  nom: string;
  image: string;

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
    console.log(this.existingArticles);
  }

  refresh() {
    this.articleService.getAll().subscribe(data => {
      this.existingArticles = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  private saveArticle() {
    this.articleService.save(this.newArticle).subscribe(data => {
      this.refresh();
      this.newArticle = new Article();
    });
  }

  submit() {
    const dialogRef = this.dialog.open(CreateArticleModalComponent, { data: this.newArticle });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.newArticle = result;
      this.saveArticle();
    })
    this.notificationService.openSnackBar("Article ajouté avec succés");
  }

  openConfirmDialog(): any {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: "400px", data: new ConfirmDialogModel("Attention", "Are you sure to delete") });
    return dialogRef;
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

  delete(id: number) {
    this.openConfirmDialog().afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.articleService.delete(id).subscribe(data => {
          console.log(data);
          this.refresh();
        });
        this.notificationService.openSnackBar("Deleted succesfully");
      }
    });
  }

}
