import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/modalsl/product.modal';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // PRODUCT CART OBSERVABLE
  private productItemsInCartSubject: BehaviorSubject<Array<Product>> = new BehaviorSubject([]);
  private productItemsInCart: Array<Product> = [];
  private productTempArray: Array<any> = [];

  constructor() {
    this.productItemsInCartSubject.subscribe(productCart => this.productItemsInCart = productCart);
  }




  // PRODUCTS TO CART METHODS *********************************************

  public addProductToCart(item: Product): void {
    const currentItems = [...this.productItemsInCart];
    if (this.productTempArray.indexOf(item.id) === -1) {
      item.quantity = 1;
      this.productItemsInCartSubject.next([...this.productItemsInCart, item]);
      this.productTempArray.push(item.id);
    } else {
      const index: number = this.productTempArray.indexOf(item.id);
      this.productItemsInCart[index].quantity++;
      this.productItemsInCart[index].price = this.productItemsInCart[index].price * this.productItemsInCart[index].quantity;
      this.productItemsInCartSubject.next(this.productItemsInCart);
    }
  }




  public removeProductFromCart(item: Product): void {
    const index: number = this.productTempArray.indexOf(item.id);
    if (index !== -1) {
      const quantity: number = this.productItemsInCart[index].quantity;

      if (quantity === 1) {
        this.productTempArray = [];
        const currentItems = [...this.productItemsInCart];
        const itemsWithoutRemoved = currentItems.filter(cart => cart.id !== item.id);
        this.productItemsInCartSubject.next(itemsWithoutRemoved);
        this.productItemsInCart.forEach((key, ind) => {
          this.productTempArray.push(key.id);
        });
      } else if (quantity > 1) {
        this.productItemsInCart[index].quantity--;
        this.productItemsInCart[index].price = this.productItemsInCart[index].price * this.productItemsInCart[index].quantity;
        this.productItemsInCartSubject.next(this.productItemsInCart);
      }

    }
  }




  public getCartItems(): Observable<Array<Product>> {
    return this.productItemsInCartSubject;
  }




  public getCartTotalAmount(): Observable<number> {
    return this.productItemsInCartSubject
      .pipe(
        map((items: Array<Product>) => {
          return items.reduce((prev, curr: any) => {
            return prev + curr.price;
          }, 0);
        })
      );
  }




  public cleanProductCart(): void {
    const currentItems = [...this.productItemsInCart];
    this.productItemsInCartSubject.next([]);
    this.productTempArray = [];
  }


  // PRODUCTS TO CART METHODS *********************************************


}
