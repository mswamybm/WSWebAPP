import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { ArticleServiceService } from 'src/app/services/article-service.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit{

  articleForm: FormGroup;
  articleId!: number;
  isEditMode: boolean = false;
  categoryitem = Category;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      createdDate: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.articleId = params['id'];
        this.isEditMode = true;
        this.articleService.getItem(this.articleId).subscribe(article => {
          this.articleForm.patchValue(article);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      if (this.isEditMode) {
        this.articleForm.value.type = Object.keys(Category).indexOf(this.articleForm.value.type);
        this.articleService.updateItem(this.articleId, this.articleForm.value).subscribe(() => {
          this.router.navigate(['/articles']);
        });
      } else {
        this.articleForm.value.id = 0;
        this.articleForm.value.type = Object.keys(Category).indexOf(this.articleForm.value.type);
        this.articleService.createItem(this.articleForm.value).subscribe(() => {
          this.router.navigate(['/articles']);
        });
      }
    }
  }
}
