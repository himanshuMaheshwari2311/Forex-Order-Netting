import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public headerRow: string[];
  public dataRows = new Array();
  obj: any;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.headerRow = ["Trade Number", "Currency Pair", "Base Notional", "Price", "Volume", "Direction"];
    this.http.post("http://localhost:8090/orders/getAllTrade", null).subscribe(res=>{
      for(var data in res){
        if(res[data]['clientId'] == JSON.parse(sessionStorage.getItem('curr_sess'))['userId']){
            var ele = new Array();
            ele.push(res[data]['orderId']);
            if(res[data]['ccyId'] == 1){
            ele.push("EUR/USD");
            } 
            else if(res[data]['ccyId'] == 2){
            ele.push("GBP/EUR");
            }
            else{
            ele.push("GBP/USD");
            }
            ele.push(res[data]['baseNotional']);
            ele.push(res[data]['price']);
            ele.push(Math.round(res[data]['price'] * res[data]['baseNotional'] * 100) / 100);
            if(res[data]['direction'] == "B"){
            ele.push("Buy");
            }
            else {
            ele.push("Sell");
            }
            this.dataRows.push(ele);
            }
        }
    });
}

}
