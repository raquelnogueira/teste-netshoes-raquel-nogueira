import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';


@Injectable()
export class ProductService {

  BASE_URL = 'http://localhost:3001/';

  constructor(
    private http: HttpClient
  ) {}

  // faz a requisição para a rota da API para fazer a listagem de produtos
  getProduct() {
    const url = `${this.BASE_URL}products`;
    return this.http.get(url);
  }
}
