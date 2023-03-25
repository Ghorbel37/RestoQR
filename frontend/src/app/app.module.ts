import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './custom-material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ConfirmDialogComponent } from './pages/_common/confirm-dialog/confirm-dialog.component';
import { EditCategorieComponent } from './pages/categories/edit-categorie/edit-categorie.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateCategorieComponent } from './pages/modals/create-categorie/create-categorie.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CategoriesComponent,
    ArticlesComponent,
    ConfirmDialogComponent,
    EditCategorieComponent,
    LoginComponent,
    CreateCategorieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
