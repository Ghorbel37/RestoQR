import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-commande-modal',
  templateUrl: './commande-modal.component.html',
  styleUrls: ['./commande-modal.component.css']
})
export class CommandeModalComponent {
  numeroTable: number;
  numTable = new FormControl<number>(0, [Validators.required, Validators.min(1), Validators.max(this.data)]);
  // commandeForm = new FormGroup({
  //   numTable: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(this.data)]),
  // });

  constructor(
    public dialogRef: MatDialogRef<CommandeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }
}
