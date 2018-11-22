import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
