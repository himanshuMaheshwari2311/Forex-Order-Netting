import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.css']
})
export class TradehistoryComponent implements OnInit {

  public headerRow: string[];
  public dataRows = new Array();
  obj: any;

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
    this.headerRow = ["Value Date", "Order Type", "Currency Pair", "Price", "Volume", "Direction"];
    this.http.post("http://localhost:8090/orders/getAllTrade", null).subscribe(res=>{
      for(var data in res){
        var ele = new Array();
        ele.push(new Date(res[data]['valueDate']).toDateString());
        if(res[data]['tradeTypeId'] == 1){
          ele.push("Cash");
        }
        else if(res[data]['tradeTypeId'] == 2){
          ele.push("TOM");
        }
        else if(res[data]['tradeTypeId'] == 3){
          ele.push("SPOT");
        }
        else if(res[data]['tradeTypeId'] == 4){
          ele.push("Forward");
        } 
        if(res[data]['ccyId'] == 1){
          ele.push("EUR/USD");
        } 
        else if(res[data]['ccyId'] == 2){
          ele.push("GBP/EUR");
        }
        else{
          ele.push("GBP/USD");
        }
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
    });
  }

}
