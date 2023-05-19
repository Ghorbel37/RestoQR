import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande, Etat, EtatsLabel } from 'src/app/model/commande';
import { Restaurant } from 'src/app/model/restaurant';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-show-commande',
  templateUrl: './show-commande.component.html',
  styleUrls: ['./show-commande.component.css']
})
export class ShowCommandeComponent {
  columnsToDisplay = ['image', 'quantite', 'sous_total'];
  commande: Commande;
  restaurant: Restaurant;
  idCommande: number;
  duree: number;
  total: number;
  // etat: string = "";
  // etats = EtatsLabel;



  ngOnInit(): void {
    this.idCommande = this.route.snapshot.params['idCommande'];
    if (this.route.snapshot.params['idCommande']) {
      this.idCommande = this.route.snapshot.params['idCommande'];
      this.menu.getCommandeById(this.idCommande).subscribe({
        next: (data) => {
          this.commande = data;
          // this.etat = this.etats.get(this.commande.etat);
          // console.log(this.etat)
          this.calculerDureeTotal(this.commande);
        },
        error: () => this.router.navigate(['/menu']),
      });
    }
    this.menu.getRestaurant().subscribe({
      next: (data) => this.restaurant = data,
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menu: MenuService,
  ) { }

  calculerDureeTotal(commande: Commande) {
    let duree: number = 0;
    let total: number = 0;
    commande.ligneCommandes.forEach(ligne => {
      duree += ligne.article.duree * ligne.quantite;
      total += ligne.article.prix * ligne.quantite;
    });
    this.duree = duree;
    this.total = total;
  }

  // getLabel(etat: Etat): string {
  //   switch (etat) {
  //     case 0:
  //       return "Preparée";
  //     case 1:
  //       return "Annulée";
  //     case 2:
  //       return "En cours";
  //     default:
  //       return "";
  //   }
  // }
}

