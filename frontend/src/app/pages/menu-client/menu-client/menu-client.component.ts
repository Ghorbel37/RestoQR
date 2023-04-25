import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { Categorie } from 'src/app/model/categorie';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { Restaurant } from 'src/app/model/restaurant';
import { CategorieService } from 'src/app/services/categorie.service';
import { PanierService } from 'src/app/services/panier.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.css']
})
export class MenuClientComponent implements OnInit {
  categories: Categorie[];
  restaurant: Restaurant = new Restaurant();

  constructor(
    private categorieService: CategorieService,
    protected panier: PanierService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurant().subscribe({
      next: (data) =>
        this.restaurant = data,
    });
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

  toPanier() {

  }

}
