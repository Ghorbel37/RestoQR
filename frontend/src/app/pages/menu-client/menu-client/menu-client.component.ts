import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Article } from 'src/app/model/article';
import { Categorie } from 'src/app/model/categorie';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { Restaurant } from 'src/app/model/restaurant';
import { Table } from 'src/app/model/table';
import { CategorieService } from 'src/app/services/categorie.service';
import { PanierService } from 'src/app/services/panier.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.css']
})
export class MenuClientComponent implements OnInit {
  categories: Categorie[];
  restaurant: Restaurant = new Restaurant();
  table: Table;

  constructor(
    private categorieService: CategorieService,
    protected panier: PanierService,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TablesService,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['idTable']) {
      this.tableService.getById(this.route.snapshot.params['idTable']).subscribe({
        next: (data) => this.table = data,
        error: () => this.router.navigate(['menu']),
      })
    }
    this.restaurantService.getRestaurant().subscribe({
      next: (data) =>
        this.restaurant = data,
    });
    this.categorieService.getAll().subscribe({
      next: (data) => this.categories = data,
    });
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
    if (this.table) {
      this.router.navigate(['/panier', this.table.idTable]);
    }
    else {
      this.router.navigate(['/panier']);
    }
  }

}
