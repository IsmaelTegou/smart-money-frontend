import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  getCathegoryByType(type: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl+'/type/'+type);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(this.apiUrl+'/'+id, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl+'/'+id);
  }
}
