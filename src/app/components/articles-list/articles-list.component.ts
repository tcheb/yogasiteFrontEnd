import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  articles: any;
  currentArticle = {id: -1, title: '', description: '', published: false};
  currentIndex = -1;
  title = '';

  constructor(private articleService: ArticleService) { }


  ngOnInit(): void {
    this.retrieveArticles();
  }

  retrieveArticles(): void {
    this.articleService.getAll()
      .subscribe(
        data => {
          this.articles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveArticles();
    this.currentArticle = {id: -1, title: '', description: '', published: false};
    this.currentIndex = -1;
  }

  setActiveArticles(article: any, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
  }

  removeAllArticles(): void {
    this.articleService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveArticles();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.articleService.findByTitle(this.title)
      .subscribe(
        data => {
          this.articles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}

