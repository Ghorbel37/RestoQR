import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { PanierService } from 'src/app/services/panier.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../_common/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeModalComponent } from '../commande-modal/commande-modal.component';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TablesService } from 'src/app/services/tables.service';
import { Table } from 'src/app/model/table';
import { CommandeService } from 'src/app/services/commande.service';
import { Commande } from 'src/app/model/commande';
import { LigneCommandeService } from 'src/app/services/ligne-commande.service';
import { AlertDialogComponent, AlertDialogModel } from '../../_common/alert-dialog/alert-dialog.component';

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
    if (this.route.snapshot.params['idTable']) {
      this.tableService.getById(this.route.snapshot.params['idTable']).subscribe({
        next: (data) => this.table = data,
        error: () => this.router.navigate(['/panier']),
      })
    }
  }

  constructor(
    protected panier: PanierService,
    private dialog: MatDialog,
    private router: Router,
    private restaurant: RestaurantService,
    private tableService: TablesService,
    private commandeService: CommandeService,
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute,
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
        this.openCommandePopup(restaurant.nbrTables, this.table);
      },
    });
  }

  openCommandePopup(nbrTables: number, table: Table) {
    const dialogRef = this.dialog.open(CommandeModalComponent, { maxWidth: "400px", data: { nbrTables, table } });
    dialogRef.afterClosed().subscribe(
      dialogResult => {
        if (dialogResult) {
          console.log(dialogResult);
          this.saveLigneCommandes(dialogResult[0], dialogResult[1]);

          // this.panier.emptyCart();
          // this.router.navigate(['menu']);
        }
      });
  }

  saveLigneCommandes(numTable: number, instructions: string) {
    this.ligneCommandeService.saveAll(this.panier.lignes).subscribe({
      next: (data) => {
        this.panier.lignes = data;
        this.createCommande(numTable, instructions);
      },
    })
  }

  createCommande(numTable: number, instructions: string) {
    this.tableService.getByNumero(numTable).subscribe({
      next: (data) => {
        this.commande.date = new Date();
        this.commande.etat = 2;
        this.commande.description = instructions;
        this.commande.ligneCommandes = this.panier.lignes;
        this.commande.tableRestaurant = data;
        this.saveCommande(this.commande);
      },
    })
  }

  saveCommande(commande: Commande) {
    this.commandeService.save(commande).subscribe({
      next: (data) => this.dialog.open(AlertDialogComponent, { maxWidth: "400px", data: new AlertDialogModel("Succés", "Nous avons reçu votre commande") })
        .afterClosed().subscribe(() => {
          this.router.navigate(["/menu"]);
          this.panier.emptyCart();
        }),

    });
  }
}