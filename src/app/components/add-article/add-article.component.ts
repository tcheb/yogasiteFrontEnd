import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  article = {
    title: '',
    description: '',
    text: '',
    group: null,
    published: false
  };

  groups: any = [];
  submitted = false;

  constructor(private articleService: ArticleService, private groupService: GroupService) { }

  ngOnInit(): void {
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

  saveArticle(): void {
    const data = {
      title: this.article.title,
      description: this.article.description,
      text: this.article.text,
      published: this.article.published,
      group: this.article.group
    };

    this.articleService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newArticle(): void {
    this.submitted = false;
    this.article = {
      title: '',
      description: '',
      text: '',
      group: null,
      published: false
    };
  }
}