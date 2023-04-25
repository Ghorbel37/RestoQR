import { Injectable } from '@angular/core';
import { LigneCommande } from '../model/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panier: LigneCommande[];
  prixTotal: number;
  quantitePanier: number;

  constructor() { }

  //Add to cart and verify if exists to change quantité
  addToCart(ligne: LigneCommande) {
    if (!this.panier) {
      this.panier = new Array();
    }
    let i = this.panier.findIndex(lc => lc.article.idArticle === ligne.article.idArticle);
    if (i > -1) {
      this.panier[i].quantite++;
      this.calculerPrixLigne(this.panier[i]);
    }
    else {
      this.panier.push(ligne);
    }
    this.calculerPrixQuantite();
  }

  //Delete item from cart
  removeFromCart(ligne: LigneCommande) {
    if (this.panier) {
      var i = this.panier.findIndex(lc => lc.article.idArticle === ligne.article.idArticle);
      if (i > -1 && this.panier[i].quantite > 1) {
        this.panier[i].quantite--;
        this.calculerPrixLigne(this.panier[i]);
        console.log(this.panier[i])
      }
      else if (i > -1) {
        this.panier.splice(i, 1);
      }
      this.calculerPrixQuantite();

      if (this.panier.length == 0) {
        this.panier = null;
      }
    }
  }

  calculerPrixLigne(ligne: LigneCommande) {
    ligne.prixLigne = ligne.article.prix * ligne.quantite;
  }

  calculerPrixQuantite() {
    let total: number = 0;
    let quantite: number = 0;
    this.panier.forEach(function (ligne, i) {
      console.log(ligne);
      total += ligne.prixLigne;
      quantite += ligne.quantite;
    });
    this.prixTotal = total;
    this.quantitePanier = quantite;
  }
}
