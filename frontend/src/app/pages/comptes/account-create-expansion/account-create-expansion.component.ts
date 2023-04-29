import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User, Role } from 'src/app/model/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-create-expansion',
  templateUrl: './account-create-expansion.component.html',
  styleUrls: ['./account-create-expansion.component.css']
})
export class AccountCreateExpansionComponent implements OnInit {
  user: User = new User();
  roles: string[] = ["ADMIN", "PERSONNEL", "CLIENT"];
  // role: Role;
  // this = Object.values(Role);//.filter(value => typeof value !== 'number');;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    // this.enum = Object.keys(this.user.role).filter(f => !isNaN(Number(f)));
  }

  submit() {

    this.userService.save(this.user).subscribe(data => {
      this.refresh.emit();
      this.notificationService.openSnackBar("Compte ajouté avec succés");
      this.user = new User();
    });
  }

}
