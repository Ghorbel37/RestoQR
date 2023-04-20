import { Injectable } from '@angular/core';
import { LigneCommande } from '../model/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panier: LigneCommande[];

  constructor() { }

  //Add to cart and verify if exists to change quantité
  addToCart(ligne: LigneCommande) {
    this.panier.push(ligne);
  }

  //Delete item from cart
  removeFromCart(ligne: LigneCommande) {
    this.panier.pop
  }

  calculerPrixTotal() {

  }

  calculerPrixLigne() {

  }

  calculerQuantiteProduits() {

  }
}
