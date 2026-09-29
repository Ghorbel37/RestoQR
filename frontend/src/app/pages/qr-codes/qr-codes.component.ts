import { Component, OnInit } from '@angular/core';
import * as printJS from 'print-js';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { QRCodeModule } from 'angularx-qrcode';
import { environment } from 'src/environments/environment.development';
import { TablesService } from 'src/app/services/tables.service';
import { Table } from 'src/app/model/table';


@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.component.html',
  styleUrls: ['./qr-codes.component.css']
})
export class QrCodesComponent implements OnInit {
  qrData = environment.qrCodeUrl;
  nomRestaurant: string = "Restaurant";
  nbrTables: number;
  tables: Table[];
  selectedTable: number;

  constructor(
    private restaurantService: RestaurantService,
    private tableService: TablesService,
  ) {

  }
  ngOnInit(): void {
    this.restaurantService.getRestaurant().subscribe({
      next: (data) => {
        this.nomRestaurant = data.nomRestaurant;
        this.nbrTables = data.nbrTables;
        this.tableService.getAll().subscribe({
          next: (data) => {
            data.splice(this.nbrTables);
            this.tables = data;
            this.selectedTable = this.tables[0].idTable;
          },
        })
      },
      error: () => this.nomRestaurant = "Restaurant"
    });


  }

  tableUrl(idTable: number): string {
    return environment.qrCodeTableUrl + idTable;
  }

  printPdf(parent: any, photoNumber: number) {
    let parentElement = null
    let photoArray = [];
    parentElement = parent.qrcElement.nativeElement.querySelector("img").src

    for (let i = 0; i < photoNumber; i++) {
      photoArray.push(parentElement);
    }


    if (photoArray) {
      printJS({
        printable: photoArray,
        type: "image",
        header: this.nomRestaurant, // Optional
        documentTitle: "QR code " + this.nomRestaurant,
        // showModal: true, // Optional
        // modalMessage: "Impression du code QR...", // Optional
        style: "img { width:100% ;margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);}", // Optional})
        maxWidth: 500,
      });
    }
  }

  printMultiple(parent: any, photoNumber: number) {
    let parentElement = null
    let photoArray = [];
    parentElement = parent.qrcElement.nativeElement.querySelector("img").src

    for (let i = 0; i < this.tables.length; i++) {
      photoArray.push(parentElement);
    }


    if (photoArray) {
      printJS({
        printable: photoArray,
        type: "image",
        header: this.nomRestaurant, // Optional
        documentTitle: "QR code " + this.nomRestaurant,
        // showModal: true, // Optional
        // modalMessage: "Impression du code QR...", // Optional
        style: "img { width:100% ;margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);}", // Optional})
        maxWidth: 500,
      });
    }
  }

}
