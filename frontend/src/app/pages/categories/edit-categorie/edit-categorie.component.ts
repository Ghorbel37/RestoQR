import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from 'src/app/model/categorie';
import { SousCategorie } from 'src/app/model/sous-categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { SousCategorieService } from 'src/app/services/sous-categorie.service';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  id: number;
  categorie: Categorie = new Categorie();
  sousCategories: SousCategorie[];
  categories: Categorie[];
  // myControl = new FormControl('');
  sousCategoriesSelectionnes: SousCategorie[];
  // myForm: FormGroup;

  constructor(
    private categorieService: CategorieService,
    private sousCategorieService: SousCategorieService,
    private route: ActivatedRoute,
    // private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.categorieService.getById(this.id).subscribe(data => {
      this.categorie = data;
      this.sousCategoriesSelectionnes = data.sous_Categories;
    });
    this.sousCategorieService.getAll().subscribe(data => { this.sousCategories = data; });

    // this.myForm = this.fb.group({
    //   idCategorie: this.categorie.idCategorie,
    //   scSelect: [this.categorie.sous_Categories]
    // });
    // this.myForm.get('scSelect').setValue(this.categorie.sous_Categories);
  }

  onSubmit() {
    console.log(this.categorie);
    this.categorieService.update(this.id, this.categorie).subscribe(data => { console.log(data) });
  }

}
