import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_common/confirm-dialog/confirm-dialog.component';
import { UpdateCategorieModalComponent } from './update-categorie-modal/update-categorie-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  columnsToDisplay = ['nom', 'image', 'active', 'action'];
  categorie: Categorie = new Categorie();
  result: string = '';
  dataSource = new MatTableDataSource<Categorie>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categorieService: CategorieService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.refresh();
    this.notificationService.openSnackBar('Categories affichés');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if (!data[sortHeaderId]) {
        return this.sort.direction === "asc" ? '3' : '1';
      }
      return '2' + data[sortHeaderId].toLocaleLowerCase();
    };
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.nom.toLocaleLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    this.categorieService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  toggleActive(id: number, categorie: Categorie) {
    console.log(categorie)
    categorie.active = !categorie.active;
    this.categorieService.update(id, categorie).subscribe();
  }

  submit() {
    this.categorieService.save(this.categorie).subscribe(data => {
      this.refresh();
      this.notificationService.openSnackBar("Categorie ajouté avec succés");
      this.categorie = new Categorie();
    });
  }


  update(categorie: Categorie) {
    const dialogRef = this.dialog.open(UpdateCategorieModalComponent, { data: categorie })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.categorie = dialogResult;
        this.categorieService.update(this.categorie.idCategorie, this.categorie).subscribe({
          next: () => this.refresh(),
        });
        this.categorie = new Categorie();
      }
      else this.refresh();
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: "400px", data: new ConfirmDialogModel("Attention", "Êtes-vous sûr de vouloir supprimer") });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.categorieService.delete(id).subscribe(data => {
          this.refresh();
          this.notificationService.openSnackBar("Element supprimé");
        });
      }
    });
  }
}
