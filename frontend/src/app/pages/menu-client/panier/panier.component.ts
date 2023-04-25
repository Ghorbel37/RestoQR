import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { PanierService } from 'src/app/services/panier.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../_common/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  columnsToDisplay = ['image', 'details', 'action'];

  ngOnInit(): void {
  }

  constructor(
    protected panier: PanierService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  addToCart(ligne: LigneCommande) {
    this.panier.addToCart(ligne);
  }

  removeFromCart(ligne: LigneCommande) {
    this.panier.removeFromCart(ligne);
  }

  deleteLigne(ligne: LigneCommande) {
    this.panier.deleteLigne(ligne);
  }

  emptyCart() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: "400px", data: new ConfirmDialogModel("Attention", "Êtes-vous sûr de vouloir vider le panier") });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.panier.emptyCart();
        this.router.navigate(['menu']);
      }
    });
  }

  passerCommande() {

  }
}
