import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_common/confirm-dialog/confirm-dialog.component';
import { UpdateCategorieModalComponent } from './update-categorie-modal/update-categorie-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  columnsToDisplay = ['nom', 'image', 'action'];
  existingCategories: Categorie[];
  categorie: Categorie = new Categorie();
  result: string = '';

  constructor(
    private categorieService: CategorieService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.refresh();
    this.notificationService.openSnackBar('Categories affichés')
  }

  refresh() {
    this.categorieService.getAll().subscribe(data => {
      this.existingCategories = data;
      this.changeDetectorRef.detectChanges();
    });
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
        this.categorieService.update(this.categorie.idCategorie, this.categorie).subscribe();
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
