import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from './create-order.service';

import { Order } from '../order';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ordercreate',
  templateUrl: './ordercreate.component.html'
})
export class OrdercreateComponent implements OnInit {
  user_code: string;
  user_full_name: string;  
  obj: any;
  public headerRow : string[];
  public dataRows = new Array();
  time: any;
  
  private order = new Order();
  
  constructor(private coService: CreateOrderService, private http: HttpClient) {
    this.obj = JSON.parse(sessionStorage.getItem("curr_sess"));
    this.loadSessionData();
    
    }

  ngOnInit() {
    this.headerRow = ["Currency Pair", "Price"];
    this.http.get("https://forex.1forge.com/1.0.3/quotes?pairs=EURUSD,GBPEUR,GBPUSD&api_key=qlajbqVH3vSEL3pn2EgoHQ6mwdKvKMRU").subscribe(res=>{
      for(var i in res){
        var data = new Array();
        data.push(res[i]['symbol']);
        data.push(res[i]['price']);
        this.dataRows.push(data);
        this.time = new Date(res[i]['timestamp'] * 1000);
      }
    });
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
  getDetails(value){
    
  }

}
