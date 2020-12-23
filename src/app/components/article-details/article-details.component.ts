import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  currentArticle = {id: -1, text: '', title: '', description: '', created: '', published: false, group: null};
  message = '';
  groups: any = [];

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService) { }

  ngOnInit(): void {
    this.message = '';
    this.getArticle(this.route.snapshot.paramMap.get('id'));
    this.groupService.getAll()
    .subscribe(
      data => {
        this.groups = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  getArticle(id: string | null): void {
    this.articleService.get(id)
      .subscribe(
        data => {
          this.currentArticle = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: any): void {
    const data = {
      title: this.currentArticle.title,
      text: this.currentArticle.text,
      description: this.currentArticle.description,
      published: status
    };

    this.articleService.update(this.currentArticle.id, data)
      .subscribe(
        response => {
          this.currentArticle.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateArticle(): void {
    this.articleService.update(this.currentArticle.id, this.currentArticle)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The article was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteArticle(): void {
    this.articleService.delete(this.currentArticle.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/articles']);
        },
        error => {
          console.log(error);
        });
  }
}
