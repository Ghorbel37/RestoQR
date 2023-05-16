import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article, Categorie } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_common/confirm-dialog/confirm-dialog.component';
import { UpdateArticleModalComponent } from './update-article-modal/update-article-modal.component';
import { CategorieService } from 'src/app/services/categorie.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  columnsToDisplay = ['libelle', 'description', 'prix', 'categorie', 'reference', 'duree', 'image', 'action'];
  article: Article = new Article();
  categories: Categorie[];
  dataSource = new MatTableDataSource<Article>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private articleService: ArticleService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private categorieService: CategorieService,
    private dialog: MatDialog,
  ) {

  }
  ngOnInit(): void {
    this.refresh();
    this.setupDataSource();
    this.categorieService.getAll().subscribe({
      next: (data) => this.categories = data,
    })
    this.notificationService.openSnackBar('Articles affichés')
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setupDataSource() {
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if (!data[sortHeaderId]) {
        return this.sort.direction === "asc" ? '3' : '1';
      }
      return '2' + data[sortHeaderId].toLocaleLowerCase();
    };
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      if (data.categorie) {
        return data.libelle.toLocaleLowerCase().includes(filter) || data.categorie.nom.toLocaleLowerCase().includes(filter);
      }
      return data.libelle.toLocaleLowerCase().includes(filter);
    };
  }

  refresh() {
    this.articleService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.changeDetectorRef.detectChanges();
    });
  }


  update(article: Article) {
    let articleCategorie: any[] = [article, this.categories];
    const dialogRef = this.dialog.open(UpdateArticleModalComponent, { data: articleCategorie });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.article = result;
        this.articleService.update(this.article.idArticle, this.article).subscribe({
          next: () => {
            this.refresh();
            this.notificationService.openSnackBar("Element modifié");
          },
        }
        );
        this.article = new Article();
      }
      else this.refresh();
    });

  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: "400px", data: new ConfirmDialogModel("Attention", "Êtes-vous sûr de vouloir supprimer") });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.articleService.delete(id).subscribe(data => {
          this.refresh();
          this.notificationService.openSnackBar("Element supprimé");
        });
      }
    });
  }

}
