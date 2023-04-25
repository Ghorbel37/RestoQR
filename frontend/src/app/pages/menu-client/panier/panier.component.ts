import { Component } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  columnsToDisplay = ['image', 'details', 'action'];

  constructor(
    protected panier: PanierService,
  ) { };

}
