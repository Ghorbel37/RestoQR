import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-profile-resto',
  templateUrl: './profile-resto.component.html',
  styleUrls: ['./profile-resto.component.css']
})
export class ProfileRestoComponent implements OnInit {
  restaurant: Restaurant = new Restaurant();
  fileName: string;

  constructor(
    private restaurantService: RestaurantService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.restaurantService.getRestaurant().subscribe(data => {
      this.restaurant = data;
    })
    // this.restaurantService.getAll();
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

      // console.log(myReader.result);
      page.restaurant.logo = myReader.result.toString();

    }
    myReader.readAsDataURL(file);
  }

  submit() {
    this.updateRestaurant();
    this.notificationService.openSnackBar("Categorie ajouté avec succés");
    console.log(this.restaurant);
  }

  updateRestaurant() {
    this.restaurantService.update(this.restaurant).subscribe();
  }

}
