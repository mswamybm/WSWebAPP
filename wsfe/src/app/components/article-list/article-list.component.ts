import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { ArticleServiceService } from 'src/app/services/article-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'title', 'description', 'type','createdDate', 'actions'];
  dataSource = new MatTableDataSource<Article>();
  totalarticles = 0;
  searchTerm = '';
  items: any[] = [
    { enumValue: Category.Sports },
    { enumValue: Category.Politics },
    { enumValue: Category.SocialMedia },
    { enumValue: Category.GlobalNews },
    { enumValue: Category.Fashion },
    { enumValue: Category.ShareMarket },
  ];
  cats = Category;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private itemService: ArticleServiceService,private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(pageIndex: number = 0, pageSize: number = 10): void {
    this.itemService.getItems(pageIndex + 1, pageSize, this.searchTerm).subscribe(response => {
      this.dataSource.data = response.data;
      console.log(this.dataSource.data);
      this.totalarticles = response.totalCount;
    });
  }

  applySearch(): void {
    this.loadItems(this.paginator.pageIndex, this.paginator.pageSize);
  }

  onPageChange(event:any): void {
    this.loadItems(event.pageIndex, event.pageSize);
  }


  editarticle(article: Article): void {
    this.router.navigate(['/articles/edit', article.id]);
  }

  deletearticle(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.loadItems(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  addItem(): void {
    this.router.navigate(['/articles/new']);
  }

}
