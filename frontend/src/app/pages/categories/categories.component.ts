import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CreateCategorieComponent } from './create-categorie-modal/create-categorie.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  columnsToDisplay = ['idCategorie', 'nom', 'image', 'action'];
  existingCategories: Categorie[];
  newCategorie: Categorie = new Categorie();
  result: string = '';
  nom: string;
  image: string;

  constructor(
    private categorieService: CategorieService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {

  }
  ngOnInit(): void {
    this.refresh();
    this.notificationService.openSnackBar('Categories affichés')
    console.log(this.existingCategories);
  }

  refresh() {
    this.categorieService.getAll().subscribe(data => {
      this.existingCategories = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  private saveCategorie() {
    this.categorieService.save(this.newCategorie).subscribe(data => this.refresh());
  }

  submit() {
    this.saveCategorie();
    this.notificationService.openSnackBar("Categorie ajouté avec succés");
    console.log(this.newCategorie);
  }

  openConfirmDialog(): any {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: "400px", data: new ConfirmDialogModel("Attention", "Êtes-vous sûr de vouloir supprimer") });
    return dialogRef;
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

  modal() {
    const dialogRef = this.dialog.open(CreateCategorieComponent, { data: { nom: this.nom, image: this.image } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.nom = result;
    });
  }

  delete(id: number) {
    this.openConfirmDialog().afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.categorieService.delete(id).subscribe(data => {
          console.log(data);
          this.refresh();
        });
        this.notificationService.openSnackBar("Element supprimé");
      }
    });
  }
}
