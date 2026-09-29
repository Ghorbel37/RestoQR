import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RestaurantService } from './services/restaurant.service';
import { Restaurant } from './model/restaurant';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from './pages/comptes/change-password-modal/change-password-modal.component';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';

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
    private titleService: Title,
    private dialog: MatDialog,
    private userService: UserService,
    private notification: NotificationService,
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

  changePassword() {
    this.userService.getByEmail(localStorage.getItem("subscriber")).subscribe({
      next: (user) => {
        this.dialog.open(ChangePasswordModalComponent, { data: user })
          .afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
              user = dialogResult;
              this.userService.update(user.idUser, user).subscribe({
                next: () => {
                  this.notification.openSnackBar("Mot de passe modifié");
                  this.logout();
                },
              });
            }
          });
      },
    })
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
