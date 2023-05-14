import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditCategorieComponent } from './pages/categories/edit-categorie/edit-categorie.component';
import { LoginComponent } from './pages/login/login.component';
import { QrCodesComponent } from './pages/qr-codes/qr-codes.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileRestoComponent } from './pages/profile/profile-resto/profile-resto.component';
import { MenuClientComponent } from './pages/menu-client/menu-client/menu-client.component';
import { PanierComponent } from './pages/menu-client/panier/panier.component';
import { AccountListComponent } from './pages/comptes/account-list/account-list.component';

const routes: Routes = [
  // { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'codes', component: QrCodesComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'categories/edit/:id', component: EditCategorieComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileRestoComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuClientComponent },
  { path: 'menu/:idTable', component: MenuClientComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'panier/:idTable', component: PanierComponent },
  { path: 'users', component: AccountListComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
