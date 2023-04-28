import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Table } from 'src/app/model/table';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-commande-modal',
  templateUrl: './commande-modal.component.html',
  styleUrls: ['./commande-modal.component.css']
})
export class CommandeModalComponent {
  numMax: number;
  table: Table;
  numeroTable: number;
  numTable: FormControl;
  instructions: FormControl;

  // commandeForm = new FormGroup({
  //   numTable: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(this.data)]),
  // });

  constructor(
    public dialogRef: MatDialogRef<CommandeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nbrTables: number, table: Table },
  ) { }

  ngOnInit(): void {
    this.numMax = this.data.nbrTables;
    this.table = this.data.table;
    this.numTable = new FormControl<number>(0, [Validators.required, Validators.min(1), Validators.max(this.numMax)]);
    this.instructions = new FormControl(null, [Validators.maxLength(255)]);

    if (this.table) {
      this.numTable.setValue(this.table.numero);
    }

    console.log(this.data);
  }
}
