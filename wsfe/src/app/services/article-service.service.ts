import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  private baseUrl = 'https://localhost:7283/api/Article';
  constructor(private http:HttpClient) { }

  getItems(pageNumber: number, pageSize: number, searchTerm: string = ''): Observable<{ data: Article[], totalCount: number }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<{ data: Article[], totalCount: number }>(`${this.baseUrl}/search`, { params });
  }

  getItem(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${id}`);
  }

  createItem(article: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl, article);
  }

  updateItem(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.baseUrl}/${id}`, article);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
