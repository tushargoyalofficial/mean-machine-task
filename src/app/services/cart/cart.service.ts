import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartProduct } from 'src/app/shared/modalsl/cart-product.modal';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // PRODUCT CART OBSERVABLE
  private productItemsInCartSubject: BehaviorSubject<Array<CartProduct>> = new BehaviorSubject([]);
  private productItemsInCart: Array<CartProduct> = [];
  private productTempArray: Array<any> = [];

  constructor() {
    this.productItemsInCartSubject.subscribe(productCart => this.productItemsInCart = productCart);
  }




  // PRODUCTS TO CART METHODS *********************************************

  public addProductToCart(item: CartProduct): void {
    const currentItems = [...this.productItemsInCart];
    if (this.productTempArray.indexOf(item.id) === -1) {
      item.quantity = 1;
      item.cartPrice = item.price;
      this.productItemsInCartSubject.next([...currentItems, item]);
      this.productTempArray.push(item.id);
    } else {
      const index: number = this.productTempArray.indexOf(item.id);
      this.productItemsInCart[index].quantity++;
      this.productItemsInCart[index].cartPrice = this.productItemsInCart[index].price * this.productItemsInCart[index].quantity;
      this.productItemsInCartSubject.next(this.productItemsInCart);
    }
  }




  public removeProductFromCart(item: CartProduct): void {
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
        this.productItemsInCart[index].cartPrice = this.productItemsInCart[index].price * this.productItemsInCart[index].quantity;
        this.productItemsInCartSubject.next(this.productItemsInCart);
      }

    }
  }




  public getCartItems(): Observable<Array<CartProduct>> {
    return this.productItemsInCartSubject;
  }




  public getCartTotalAmount(): Observable<number> {
    return this.productItemsInCartSubject
      .pipe(
        map((items: Array<CartProduct>) => {
          return items.reduce((prev, curr: any) => {
            return prev + curr.cartPrice;
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
