import { Component, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-article-expansion',
  templateUrl: './create-article-expansion.component.html',
  styleUrls: ['./create-article-expansion.component.css']
})
export class CreateArticleExpansionComponent {
  article: Article = new Article();
  fileName: string;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();

  constructor(
    private articleService: ArticleService,
    private notificationService: NotificationService,
  ) { }

  submit() {
    this.articleService.save(this.article).subscribe(data => {
      this.refresh.emit();
      this.notificationService.openSnackBar("Article ajouté avec succés");
      this.article = new Article();
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var page = this;

    myReader.onloadend = function (e) {
      page.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      page.article.image = myReader.result.toString();
    }
    myReader.readAsDataURL(file);
  }
}
