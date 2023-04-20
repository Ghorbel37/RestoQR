import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.css']
})
export class MenuClientComponent implements OnInit {
  categories: Categorie[]

  constructor(
    private categorieService: CategorieService,
  ) { }

  ngOnInit(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => this.categories = data,
    })
  }

}
