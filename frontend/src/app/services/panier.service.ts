import { Injectable } from '@angular/core';
import { LigneCommande } from '../model/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  lignes: LigneCommande[];
  prixTotal: number;
  quantitePanier: number;

  constructor() { }

  //Add to cart and verify if exists to change quantité
  addToCart(ligne: LigneCommande) {
    if (!this.lignes) {
      this.lignes = new Array();
    }
    let i = this.lignes.findIndex(lc => lc.article.idArticle === ligne.article.idArticle);
    if (i > -1) {
      this.lignes[i].quantite++;
      this.calculerPrixLigne(this.lignes[i]);
    }
    else {
      this.lignes.push(ligne);
    }
    this.calculerPrixQuantite();
  }

  //Remove item from cart
  removeFromCart(ligne: LigneCommande) {
    if (this.lignes) {
      var i = this.lignes.findIndex(lc => lc.article.idArticle === ligne.article.idArticle);
      if (i > -1 && this.lignes[i].quantite > 1) {
        this.lignes[i].quantite--;
        this.calculerPrixLigne(this.lignes[i]);
      }
      else if (i > -1) {
        this.lignes.splice(i, 1);
      }
      this.calculerPrixQuantite();

      if (this.lignes.length == 0) {
        this.lignes = null;
      }
    }
  }

  deleteLigne(ligne: LigneCommande) {
    if (this.lignes) {
      var i = this.lignes.findIndex(lc => lc.article.idArticle === ligne.article.idArticle);
      if (i > -1) {
        this.lignes.splice(i, 1);
      }
      this.calculerPrixQuantite();

      if (this.lignes.length == 0) {
        this.lignes = null;
      }
    }
  }

  emptyCart() {
    this.lignes = null;
  }

  calculerPrixLigne(ligne: LigneCommande) {
    ligne.prixLigne = ligne.article.prix * ligne.quantite;
  }

  calculerPrixQuantite() {
    let total: number = 0;
    let quantite: number = 0;
    this.lignes.forEach(function (ligne, i) {
      total += ligne.prixLigne;
      quantite += ligne.quantite;
    });
    this.prixTotal = total;
    this.quantitePanier = quantite;
    console.log(this.lignes);
  }
}
