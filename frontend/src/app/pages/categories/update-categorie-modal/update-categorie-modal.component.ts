import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/categorie';

@Component({
  selector: 'app-update-categorie-modal',
  templateUrl: './update-categorie-modal.component.html',
  styleUrls: ['./update-categorie-modal.component.css']
})
export class UpdateCategorieModalComponent {
  nomCategorie: FormControl = new FormControl<string>(this.data.nom, [Validators.required]);
  fileName: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateCategorieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categorie
  ) { }

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

      page.data.image = myReader.result.toString();

    }
    myReader.readAsDataURL(file);
  }
}
