import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RestaurantService } from './services/restaurant.service';
import { Restaurant } from './model/restaurant';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Restaurant';
  restaurant: Restaurant = new Restaurant();
  theme = 'indigo-pink-light';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private restaurantService: RestaurantService,
    private titleService: Title
  ) {

  }
  ngOnInit() {
    if (this.isLoggedIn())
      this.restaurantService.getRestaurant().subscribe({
        next: (data) => {
          this.restaurant = data;
          this.title = this.restaurant.nomRestaurant
          this.titleService.setTitle(this.title);
        },
        error: () => this.titleService.setTitle(this.title)
      });
  }

  currentTheme() {
    return { [this.theme]: true };
  }

  setCurrentTheme(theme: string) {
    this.theme = theme;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
