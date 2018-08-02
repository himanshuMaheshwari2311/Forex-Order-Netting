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
  price = [0, 0, 0]

  orderType;
  currencyPair;
  direction;
  currencyPrice;
  date;
  base;
  quotePrice;
  currency1;
  currency2;
  
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
        this.price[i] = res[i]['price'];
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
    this.order['price'] = this.price[this.order['ccyId'] - 1];
    this.order['quoteCurrency'] = this.quotePrice;
    console.log(new Date().getDate());
    console.log(this.order);

    this.coService.createOrder(this.order).subscribe(data=>{

    });

  }
  getOrderType(value){
    console.log(value);
    this.orderType = value;
    var td = new Date();
    var date, month, year;
    month = td.getMonth() + 1;
    year = td.getFullYear();
    if(value == 1 || value == 3){
      date = td.getDate();
    }
    else if(value == 2){
      td.setDate(td.getDate() + 1);
      date = td.getDate();
    }
    else if(value == 4){
      td.setDate(td.getDate() + 3);
      date = td.getDate();
    }
    this.date = date + "/" + month + "/" + year;
  }
  
  getCurrencyPair(value){
    console.log(value);
    this.currencyPair = value;
    
    this.currencyPrice = this.price[value - 1];
  }
  
  // getCurrency1(value){
  //   console.log(value);
  //   if(value == 1)
  //     this.currency1 = "EUR";
  //   else if(value == 2)
  //     this.currency1 = "GBP";
  //   else this.currency1 == "USD";
  //   console.log(this.currency1);
  // }
  
  // getCurrency2(value){
  //   console.log(value);
  //   if(value == 1)
  //     this.currency2 = "EUR";
  //   else if(value == 2)
  //     this.currency2 = "GBP";
  //   else this.currency2 == "USD";
  //   if(this.currency1 == "EUR" && this.direction == )
  //   this.currencyPrice = this.price[value - 1];
  // }
  

  getDirection(value){
    console.log(value);
    this.direction = value;
  }
  getBase(value){
    console.log(value);
    this.base = value;
    this.quotePrice = value * this.currencyPrice;
  }
}
