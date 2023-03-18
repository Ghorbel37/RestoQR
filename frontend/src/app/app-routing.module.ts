import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { LayoutComponent } from './layout/layout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SousCategorieComponent } from './pages/sous-categorie/sous-categorie.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'layout', component: LayoutComponent },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'sous_categories', component: SousCategorieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
