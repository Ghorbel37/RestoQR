import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-profile-resto',
  templateUrl: './profile-resto.component.html',
  styleUrls: ['./profile-resto.component.css']
})
export class ProfileRestoComponent implements OnInit {
  restaurant: Restaurant = new Restaurant();
  fileName: string;
  hide = true;

  constructor(
    private restaurantService: RestaurantService,
    private notificationService: NotificationService,
    private tableService: TablesService,
  ) { }

  ngOnInit() {
    this.restaurantService.getRestaurant().subscribe(data => {
      this.restaurant = data;
    })
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var page = this;

    myReader.onloadend = function (e) {
      page.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      page.restaurant.logo = myReader.result.toString();

    }
    myReader.readAsDataURL(file);
  }

  submit() {
    this.restaurantService.update(this.restaurant).subscribe({
      next: () => {
        if (this.restaurant.nbrTables && this.restaurant.nbrTables > 0) {
          this.tableService.updateTables(this.restaurant.nbrTables).subscribe();
        }
        this.notificationService.openSnackBar("Informations restaurant mises à jour")
      }
    });
  }
}
