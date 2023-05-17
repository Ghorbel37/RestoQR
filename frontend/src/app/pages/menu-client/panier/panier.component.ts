import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { PanierService } from 'src/app/services/panier.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../_common/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeModalComponent } from '../commande-modal/commande-modal.component';
import { Table } from 'src/app/model/table';
import { Commande } from 'src/app/model/commande';
import { AlertDialogComponent, AlertDialogModel } from '../../_common/alert-dialog/alert-dialog.component';
import { MenuService } from 'src/app/services/menu.service';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  // @ViewChild('cartBottom', { static: true }) cartBottomRef!: ElementRef;
  columnsToDisplay = ['image', 'details', 'action'];
  nbrTables: number;
  table: Table;
  commande = new Commande();

  ngOnInit(): void {
    if (this.route.snapshot.params['idTable']) {
      this.menu.getTableById(this.route.snapshot.params['idTable']).subscribe({
        next: (data) => this.table = data,
        error: () => this.router.navigate(['/panier']),
      })
    }
    // this.setCartBottomHeight();
  }

  constructor(
    protected panier: PanierService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private menu: MenuService,
    private clientService: ClientService
  ) { }

  // setCartBottomHeight() {
  //   const cartBottom = this.cartBottomRef.nativeElement;
  //   const contentHeight = document.querySelector('.content')!.clientHeight; // replace with selector for content above "cart-bottom" div
  //   const windowHeight = window.innerHeight;
  //   const cartBottomHeight = windowHeight - contentHeight;
  //   this.renderer.setStyle(cartBottom, 'height', cartBottomHeight + 'px');
  // }

  // @HostListener('window:resize')
  // onWindowResize() {
  //   this.setCartBottomHeight();
  // }

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
    this.menu.getRestaurant().subscribe({
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
    this.menu.saveAllLigneCommandes(this.panier.lignes).subscribe({
      next: (data) => {
        this.panier.lignes = data;
        this.getPassager(numTable, instructions);
      },
    })
  }

  getPassager(numTable: number, instructions: string) {
    this.clientService.getByName("Passager").subscribe({
      next: (data) => {
        this.createCommande(numTable, instructions, data);
      }
    })
  }

  createCommande(numTable: number, instructions: string, passager: Client) {
    this.menu.getTableByNumero(numTable).subscribe({
      next: (data) => {
        this.commande.date = new Date();
        this.commande.etat = 2;
        this.commande.description = instructions;
        this.commande.ligneCommandes = this.panier.lignes;
        this.commande.tableRestaurant = data;
        this.commande.client = passager;
        this.saveCommande(this.commande);
      },
    })
  }

  saveCommande(commande: Commande) {
    this.menu.saveCommande(commande).subscribe({
      next: (data) => this.dialog.open(AlertDialogComponent, { maxWidth: "400px", data: new AlertDialogModel("Succés", "Nous avons reçu votre commande") })
        .afterClosed().subscribe(() => {
          this.router.navigate(["/menu"]);
          this.panier.emptyCart();
        }),
    });
  }
}