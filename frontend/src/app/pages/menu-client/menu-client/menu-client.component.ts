import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { Categorie } from 'src/app/model/categorie';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { CategorieService } from 'src/app/services/categorie.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.css']
})
export class MenuClientComponent implements OnInit {
  categories: Categorie[]

  constructor(
    private categorieService: CategorieService,
    protected panier: PanierService,
  ) { }

  ngOnInit(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => this.categories = data,
    })
  }

  addToCart(article: Article) {
    let ligne: LigneCommande = new LigneCommande(article);
    this.panier.addToCart(ligne);
  }

  removeFromCart(article: Article) {
    let ligne: LigneCommande = new LigneCommande(article);
    this.panier.removeFromCart(ligne);
  }

}
