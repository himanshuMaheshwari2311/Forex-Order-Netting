import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  constructor(private http: HttpClient) { }

  createOrder(order_data){
    return this.http.post("http://localhost:8090/orders/addNew",order_data);
  }

}
