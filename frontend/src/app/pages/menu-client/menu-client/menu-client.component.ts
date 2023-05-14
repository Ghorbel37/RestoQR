import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { Categorie } from 'src/app/model/categorie';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { Restaurant } from 'src/app/model/restaurant';
import { Table } from 'src/app/model/table';
import { MenuService } from 'src/app/services/menu.service';
import { PanierService } from 'src/app/services/panier.service';

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
    protected panier: PanierService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuService,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['idTable']) {
      this.menu.getTableById(this.route.snapshot.params['idTable']).subscribe({
        next: (data) => this.table = data,
        error: () => this.router.navigate(['menu']),
      })
    }
    this.menu.getRestaurant().subscribe({
      next: (data) =>
        this.restaurant = data,
    });
    this.menu.getCategories().subscribe({
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
