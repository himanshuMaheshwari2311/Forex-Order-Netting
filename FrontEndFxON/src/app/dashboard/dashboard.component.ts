import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { chart } from 'highcharts'; 
import * as HighCharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public headerRow: string[];
  public dataRows = new Array();
  obj: any;

  @ViewChild('Buy') Buy: ElementRef;
  @ViewChild('Sell') Sell: ElementRef;
  chart1 : Highcharts.ChartObject;
  chart2 : Highcharts.ChartObject;
  
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

    this.http.get("http://localhost:8090/orders/getAllTrade").subscribe(res=>{
      var obj = JSON.parse(sessionStorage.getItem('curr_sess'));
      var name = obj['name'];
      var id = obj['userId']
      var clientData = [0, 0, 0];
      var othersData = [0, 0, 0];
      for(var i in res){
        if(res[i]['clientId'] == id){
          if(res[i]['ccyId'] == 1 && res[i]['direction'] == "B"){
            clientData[0] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 2 && res[i]['direction'] == "B"){
            clientData[1] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 3 && res[i]['direction'] == "B"){
            clientData[2] += res[i]['baseNotional'];
          }
        }
        else{
          if(res[i]['ccyId'] == 1 && res[i]['direction'] == "B"){
            othersData[0] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 2 && res[i]['direction'] == "B"){
            othersData[1] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 3 && res[i]['direction'] == "B"){
            othersData[2] += res[i]['baseNotional'];
          }
        }
      }
      const options: HighCharts.Options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Buy Orders'
        },
        xAxis: {
          categories: ['EUR/USD', 'GBP/EUR', 'GBP/USD']
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Percentage Trade'
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
          column: {
            stacking: 'percent'
          }
        },
        series: [{
          name: name,
          data: clientData
        },
        { name: "Others",
          data: othersData
      }]
      }
      this.chart1 = chart(this.Buy.nativeElement, options);
    });
    this.http.get("http://localhost:8090/orders/getAllTrade").subscribe(res=>{
      var obj = JSON.parse(sessionStorage.getItem('curr_sess'));
      var name = obj['name'];
      var id = obj['userId']
      var clientData = [0, 0, 0];
      var othersData = [0, 0, 0];
      for(var i in res){
        if(res[i]['clientId'] == id){
          if(res[i]['ccyId'] == 1 && res[i]['direction'] == "S"){
            clientData[0] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 2 && res[i]['direction'] == "S"){
            clientData[1] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 3 && res[i]['direction'] == "S"){
            clientData[2] += res[i]['baseNotional'];
          }
        }
        else{
          if(res[i]['ccyId'] == 1 && res[i]['direction'] == "S"){
            othersData[0] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 2 && res[i]['direction'] == "S"){
            othersData[1] += res[i]['baseNotional'];
          }
          
          else if(res[i]['ccyId'] == 3 && res[i]['direction'] == "S"){
            othersData[2] += res[i]['baseNotional'];
          }
        }
      }
      const options: HighCharts.Options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Sell Orders'
        },
        xAxis: {
          categories: ['EUR/USD', 'GBP/EUR', 'GBP/USD']
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Percentage Trade'
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
          column: {
            stacking: 'percent'
          }
        },
        series: [{
          name: name,
          data: clientData
        },
        { name: "Others",
          data: othersData
      }]
      }
      this.chart2 = chart(this.Sell.nativeElement, options);
    });

}

}
