import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Table } from 'src/app/model/table';

@Component({
  selector: 'app-commande-modal',
  templateUrl: './commande-modal.component.html',
  styleUrls: ['./commande-modal.component.css']
})
export class CommandeModalComponent implements OnInit {
  numMax: number;
  table: Table;
  numeroTable: number;
  numTable: FormControl;
  instructions: FormControl;
  instructionsMaxLength: number = 255;

  constructor(
    public dialogRef: MatDialogRef<CommandeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nbrTables: number, table: Table },
  ) { }

  ngOnInit(): void {
    this.numMax = this.data.nbrTables;
    this.table = this.data.table;
    this.numTable = new FormControl<number>(0, [Validators.required, Validators.min(1), Validators.max(this.numMax)]);
    this.instructions = new FormControl<string>(null, [Validators.maxLength(this.instructionsMaxLength)]);

    if (this.table) {
      this.numTable.setValue(this.table.numero);
    }
  }
}
