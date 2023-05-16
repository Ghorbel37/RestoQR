import { QRCodeModule } from 'angularx-qrcode';

import { LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr-TN';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './custom-material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ConfirmDialogComponent } from './pages/_common/confirm-dialog/confirm-dialog.component';
import { EditCategorieComponent } from './pages/categories/edit-categorie/edit-categorie.component';
import { LoginComponent } from './pages/login/login.component';
import { QrCodesComponent } from './pages/qr-codes/qr-codes.component';
import { UpdateArticleModalComponent } from './pages/articles/update-article-modal/update-article-modal.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CreateCategorieExpansionComponent } from './pages/categories/create-categorie-expansion/create-categorie-expansion.component';
import { ProfileRestoComponent } from './pages/profile/profile-resto/profile-resto.component';
import { UpdateCategorieModalComponent } from './pages/categories/update-categorie-modal/update-categorie-modal.component';
import { CreateArticleExpansionComponent } from './pages/articles/create-article-expansion/create-article-expansion.component';
import { MenuClientComponent } from './pages/menu-client/menu-client/menu-client.component';
import { PanierComponent } from './pages/menu-client/panier/panier.component';
import { CommandeModalComponent } from './pages/menu-client/commande-modal/commande-modal.component';
import { AlertDialogComponent } from './pages/_common/alert-dialog/alert-dialog.component';
import { CreateAccountComponent } from './pages/comptes/create-account/create-account.component';
import { AccountListComponent } from './pages/comptes/account-list/account-list.component';
import { AccountCreateExpansionComponent } from './pages/comptes/account-create-expansion/account-create-expansion.component';
import { ChangePasswordModalComponent } from './pages/comptes/change-password-modal/change-password-modal.component';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ArticlesComponent,
    ConfirmDialogComponent,
    EditCategorieComponent,
    LoginComponent,
    QrCodesComponent,
    UpdateArticleModalComponent,
    CreateCategorieExpansionComponent,
    ProfileRestoComponent,
    UpdateCategorieModalComponent,
    CreateArticleExpansionComponent,
    MenuClientComponent,
    PanierComponent,
    CommandeModalComponent,
    AlertDialogComponent,
    CreateAccountComponent,
    AccountListComponent,
    AccountCreateExpansionComponent,
    ChangePasswordModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-TN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
