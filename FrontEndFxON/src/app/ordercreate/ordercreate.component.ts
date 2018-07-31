import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from './create-order.service';

import { Order } from '../order';

@Component({
  selector: 'app-ordercreate',
  templateUrl: './ordercreate.component.html'
})
export class OrdercreateComponent implements OnInit {
  user_code: string;
  user_full_name: string;  
  obj: any;
  
  private order = new Order();
  
  constructor(private coService: CreateOrderService) {
    this.obj = JSON.parse(sessionStorage.getItem("curr_sess"));
    this.loadSessionData();
    
    }

  ngOnInit() {
  
  }

  loadSessionData(){
    this.user_code = this.obj['userName'];
    this.user_full_name = this.obj['name'];

  }

  createOrder({value}: {value: Order}){
    this.order = value;
    this.order['tradeTypeId'] = Number(this.order['tradeTypeId']);
    this.order['ccyId'] = Number(this.order['ccyId']);
    this.order['clientId'] = this.obj['userId'];
    this.order['price'] = 1.774;
    console.log(this.order);

    this.coService.createOrder(this.order).subscribe(data=>{

    });

  }



}
