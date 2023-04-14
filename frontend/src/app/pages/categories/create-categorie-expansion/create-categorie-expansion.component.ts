import { Component, EventEmitter, Output } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-categorie-expansion',
  templateUrl: './create-categorie-expansion.component.html',
  styleUrls: ['./create-categorie-expansion.component.css']
})
export class CreateCategorieExpansionComponent {
  categorie: Categorie = new Categorie();
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();

  constructor(
    private categorieService: CategorieService,
    // private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) { }

  private saveCategorie() {
    this.categorieService.save(this.categorie).subscribe(data => {
      this.refresh.emit();
      // this.categorie = new Categorie();

    });
  }

  submit() {
    this.saveCategorie();
    this.notificationService.openSnackBar("Categorie ajouté avec succés");
    console.log(this.categorie);
  }

}
