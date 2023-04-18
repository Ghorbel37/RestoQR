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
  fileName: string;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();

  constructor(
    private categorieService: CategorieService,
    private notificationService: NotificationService,
  ) { }

  submit() {
    this.categorieService.save(this.categorie).subscribe(data => {
      this.refresh.emit();
      this.notificationService.openSnackBar("Categorie ajouté avec succés");
      // this.categorie = new Categorie();
    });
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

      page.categorie.image = myReader.result.toString();
    }
    myReader.readAsDataURL(file);
  }
}
