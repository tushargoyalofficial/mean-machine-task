import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../services/product/product.service';
import { Router } from '@angular/router';

export interface Product {
  id; string;
  name: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  // for unsubscribe from listners
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public products: Array<Product> = [];

  constructor(
    private router: Router,
  ) { }





  ngOnInit() {
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }
}
