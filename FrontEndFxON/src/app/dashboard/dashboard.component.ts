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
  public headerRow1: string[];
  public dataRows1 = new Array();
  obj: any;

  @ViewChild('Buy') Buy: ElementRef;
  @ViewChild('Sell') Sell: ElementRef;
  
  @ViewChild('EURUSD') EURUSD: ElementRef;
  @ViewChild('GBPEUR') GBPEUR: ElementRef;
  @ViewChild('GBPUSD') GBPUSD: ElementRef;
  chart3: HighCharts.ChartObject;
  chart4: HighCharts.ChartObject;
  chart5: HighCharts.ChartObject;
  chart1 : Highcharts.ChartObject;
  chart2 : Highcharts.ChartObject;

  time;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.headerRow1 = ["Currency Pair", "Bid", "Ask", "Price"];
    this.http.get("https://forex.1forge.com/1.0.3/quotes?pairs=EURUSD,GBPEUR,GBPUSD&api_key=qlajbqVH3vSEL3pn2EgoHQ6mwdKvKMRU").subscribe(res=>{
      for(var i in res){
        var data = new Array();
        data.push(res[i]['symbol']);
        data.push(res[i]['bid']);
        data.push(res[i]['ask']);
        data.push(res[i]['price']);
        this.dataRows1.push(data);
        this.time = new Date(res[i]['timestamp'] * 1000);
      }
    });

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

    this.http.get("https://api.ofx.com/PublicSite.ApiService/SpotRateHistory/month/EUR/USD?DecimalPlaces=6&ReportingInterval=daily").subscribe(res=>{
      var data = new Array();
      for (var i in res['HistoricalPoints']){
        var temp = new Array();
        temp.push(res['HistoricalPoints'][i]['PointInTime']/1000);
        temp.push(res['HistoricalPoints'][i]['InterbankRate']);
        data.push(temp);
      }
      const options: HighCharts.Options = {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'EUR/USD exchange rate over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Exchange rate'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(239, 228, 141)']
                ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: 'EUR/USD',
          data: data
        }]
      }
      this.chart3 = chart(this.EURUSD.nativeElement, options);
    });

    this.http.get("https://api.ofx.com/PublicSite.ApiService/SpotRateHistory/month/GBP/EUR?DecimalPlaces=6&ReportingInterval=daily").subscribe(res=>{
      var data = new Array();
      for (var i in res['HistoricalPoints']){
        var temp = new Array();
        temp.push(res['HistoricalPoints'][i]['PointInTime']/1000);
        temp.push(res['HistoricalPoints'][i]['InterbankRate']);
        data.push(temp);
      }
      const options: HighCharts.Options = {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'GBP/EUR exchange rate over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Exchange rate'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(109, 224, 117)']
                ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
  
        series: [{
          type: 'area',
          name: 'GBP/EUR',
          data: data
        }]
    
      }
      this.chart4 = chart(this.GBPEUR.nativeElement, options);
    });

    this.http.get("https://api.ofx.com/PublicSite.ApiService/SpotRateHistory/month/GBP/USD?DecimalPlaces=6&ReportingInterval=daily").subscribe(res=>{
      var data = new Array();
      for (var i in res['HistoricalPoints']){
        var temp = new Array();
        temp.push(res['HistoricalPoints'][i]['PointInTime']/1000);
        temp.push(res['HistoricalPoints'][i]['InterbankRate']);
        data.push(temp);
      }
      const options: HighCharts.Options = {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'GBP/USD exchange rate over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Exchange rate'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(226, 93, 95)']
                ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
  
        series: [{
          type: 'area',
          name: 'GBP/USD',
          data: data
        }]
    
      }
      this.chart5 = chart(this.GBPUSD.nativeElement, options);
    });

}

}
