import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService]
})
export class HomeComponent implements OnInit {

  lisProductBag: Product[] = [];
  listItem: Product[] = [];
  model: Product = new Product();

  constructor(
    public service: ProductService
  ) {
  }

  ngOnInit() {
    this.getProducts();

  }

  // chama o método da service para preencher a lista de produtos vindos da API Node
  getProducts() {
    this.service.getProduct().subscribe(
      data => {
        console.log(data);
        this.listItem = data['products'] as Product[];
      },
      error => console.log(error));
  }

  // calcula as parcelas do ite
  getInstallments(price, installments) {
    const num = price / installments;
    if (installments) {
      return num.toFixed(2);
    } else {
      return price;
    }
  }

  // serada os reais do preço
  splitPrice = (valor) => {
    const decPart = (valor + '').split('.')[0];
    return decPart;
  }

  // separa os centavos do preço
  splitDecimals = (valor) => {
    const decPart = (valor + '').split('.')[1];
    return decPart;
  }

  // métodos relacionados a sacola

  // remove o item selecionado da lista estatica da sacola
  removeItem(index) {
    this.lisProductBag.splice(index, 1);
  }

  // adiciona o item na lista estatica da sacola de compras
  addItem(item) {
    this.lisProductBag.push(item);
  }

  // risca os dados do item quando o mouse passa por cima do 'x'
  changeStyle(e, index) {
    if (e.type === 'mouseover') {
      const p = document.getElementsByClassName('item-description')[index];
      p.classList.add('remove-product');
    } else if (e.type === 'mouseout') {
      const p = document.getElementsByClassName('item-description')[index];
      p.classList.remove('remove-product');
    }
  }

  // calcula o valor total da compra
  total() {
    let total = 0;
    for (let i = 0; i < this.lisProductBag.length; i++) {
      total += this.lisProductBag[i].price;
    }
    return total.toFixed(2);
  }

  // calcula as parcelas do total
  getTotalInstallments(price) {
    const num = price / 10;
    const n = num.toFixed(2);
    return n;
  }
}
