import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditCategorieComponent } from './pages/categories/edit-categorie/edit-categorie.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { LoginComponent } from './pages/login/login.component';
import { QrCodesComponent } from './pages/qr-codes/qr-codes.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileRestoComponent } from './pages/profile/profile-resto/profile-resto.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'codes', component: QrCodesComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'categories/edit/:id', component: EditCategorieComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'profile', component: ProfileRestoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
