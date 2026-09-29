import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article';
import { Categorie } from 'src/app/model/categorie';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  id: number;
  categorie: Categorie = new Categorie();
  articles: Article[];
  categories: Categorie[];
  // myControl = new FormControl('');
  articlesSelectionnes: Article[];
  // myForm: FormGroup;

  constructor(
    private categorieService: CategorieService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    // private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.categorieService.getById(this.id).subscribe(data => {
      this.categorie = data;
      this.articlesSelectionnes = data.articles;
    });
    this.articleService.getAll().subscribe(data => { this.articles = data; });

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
