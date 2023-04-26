import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { PanierService } from 'src/app/services/panier.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../_common/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { CommandeModalComponent } from '../commande-modal/commande-modal.component';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TablesService } from 'src/app/services/tables.service';
import { Table } from 'src/app/model/table';
import { CommandeService } from 'src/app/services/commande.service';
import { Commande } from 'src/app/model/commande';
import { LigneCommandeService } from 'src/app/services/ligne-commande.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  columnsToDisplay = ['image', 'details', 'action'];
  nbrTables: number;
  table: Table;
  commande = new Commande();

  ngOnInit(): void {
  }

  constructor(
    protected panier: PanierService,
    private dialog: MatDialog,
    private router: Router,
    private restaurant: RestaurantService,
    private tableService: TablesService,
    private commandeService: CommandeService,
    private ligneCommandeService: LigneCommandeService,
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
    this.restaurant.getRestaurant().subscribe({
      next: (restaurant) => {
        this.openCommandePopup(restaurant.nbrTables);
      },
    });
  }

  openCommandePopup(nbrTables: number) {
    const dialogRef = this.dialog.open(CommandeModalComponent, { maxWidth: "400px", data: nbrTables });
    dialogRef.afterClosed().subscribe(
      dialogResult => {
        if (dialogResult) {
          console.log(dialogResult);
          this.saveLigneCommandes(dialogResult);

          // this.panier.emptyCart();
          // this.router.navigate(['menu']);
        }
      });
  }

  saveLigneCommandes(numTable: number) {
    this.ligneCommandeService.saveAll(this.panier.lignes).subscribe({
      next: (data) => {
        this.panier.lignes = data;
        this.createCommande(numTable);
      },
    })
  }

  createCommande(numTable: number) {
    this.tableService.getByNumero(numTable).subscribe({
      next: (data) => {
        this.commande.date = new Date();
        this.commande.etat = 2;
        this.commande.ligneCommandes = this.panier.lignes;
        this.commande.tableRestaurant = data;
        this.saveCommande(this.commande);
      },
    })
  }

  saveCommande(commande: Commande) {
    this.commandeService.save(commande).subscribe({
      next: (data) => console.log(data),
    });
  }
}