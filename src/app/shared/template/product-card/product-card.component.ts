import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from '../../modalsl/product.modal';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() items: Array<any> = [];
  @Input() flexValue: string;
  @Input() flexValueXS: string;
  @Input() flexValueSM: string;
  @Input() flexValueMD: string;

  constructor(
    private cartService: CartService
  ) { }



  public addToCart(item: Product): void {
    this.cartService.addProductToCart(item);
  }



  ngOnInit() {
  }

}
