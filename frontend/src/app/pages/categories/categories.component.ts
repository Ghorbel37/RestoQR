import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { Base64, fromBase64 } from 'js-base64';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  columnsToDisplay = ['idCategorie', 'nom', 'image', 'action'];
  existingCategories: Categorie[];
  newCategorie: Categorie = new Categorie();

  constructor(private categorieService: CategorieService, private changeDetectorRef: ChangeDetectorRef,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
    this.refresh();
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
    console.log(this.newCategorie);
  }

  delete(id: number) {
    this.categorieService.delete(id).subscribe(data => {
      console.log(data);
      this.refresh();
    });
  }



}
