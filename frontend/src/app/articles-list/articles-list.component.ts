import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../model/categorie';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent {
  articles: Article[];

  constructor(private articleService: ArticleService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  private getAllArticle() {
    this.articleService.getAll().subscribe(data => { this.articles = data });
  }
}
