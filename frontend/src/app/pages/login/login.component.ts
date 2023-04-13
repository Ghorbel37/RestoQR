import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: UntypedFormGroup;
  loading!: boolean;
  public loginValid = true;

  constructor(private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private _authService: AuthenticationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login');
    if (this._authService.isLoggedIn()) {
      this.loginValid = true;
      this.router.navigateByUrl('/articles');
    }
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(savedUserEmail, [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required),
      rememberMe: new UntypedFormControl(savedUserEmail !== null)
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    // this.loading = true;
    this.loginValid = true;
    this._authService.login(email.toLowerCase(), password);
    if (rememberMe) {
      localStorage.setItem('savedUserEmail', email);
    } else {
      localStorage.removeItem('savedUserEmail');
    }

    if (this._authService.isLoggedIn()) {
      this.loginValid = true;
      this.router.navigateByUrl('/articles');
    }
    else {
      this.loginValid = false;
    }
  }


  // this.authenticationService
  //   .login(email.toLowerCase(), password)
  //   .subscribe(
  //     data => {
  //       if (rememberMe) {
  //         localStorage.setItem('savedUserEmail', email);
  //       } else {
  //         localStorage.removeItem('savedUserEmail');
  //       }
  //       this.router.navigate(['/']);
  //     },
  //     error => {
  //       this.notificationService.openSnackBar(error.error);
  //       this.loading = false;
  //     }
  //   );
  // }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }
}
