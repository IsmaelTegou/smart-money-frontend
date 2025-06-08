import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionResponseDTO} from '../models/transaction-response-dto';
import {TransactionRequestDTO} from '../models/transaction-request-dto';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiURL: string = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getAll(type?: string, from?: string, to?: string): Observable<TransactionResponseDTO[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<TransactionResponseDTO[]>(this.apiURL, { params });
  }

  getById(id: string): Observable<TransactionResponseDTO> {
    return this.http.get<TransactionResponseDTO>(`${this.apiURL}/${id}`);
  }

  create(transaction: TransactionRequestDTO): Observable<TransactionResponseDTO> {
    return this.http.post<TransactionResponseDTO>(this.apiURL, transaction);
  }

  update(id: string, transaction: TransactionRequestDTO): Observable<TransactionResponseDTO> {
    return this.http.put<TransactionResponseDTO>(`${this.apiURL}/${id}`, transaction);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}