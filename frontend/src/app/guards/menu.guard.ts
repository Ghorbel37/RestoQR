import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { TablesService } from '../services/tables.service';

@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate {
  exist: boolean = false;
  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private tableService: TablesService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.tableService.verifyById(route.params['idTable']).pipe(
      catchError(() => {
        this.router.navigate(['/menu']);
        return of(false);
      })
    )

    //   return this.tableService.verifyById(route.params['idTable']).map((e) => {
    //             if (e) {
    //                 return true;
    //             }
    //         })
    //         .catch(() => {
    //             this.router.navigate(['/login']);
    //             return Observable.of(false);
    //         });

    // return this.tableService.verifyById(route.params['idTable']);

    // this.router.navigate(['/menu'])
  }

}
