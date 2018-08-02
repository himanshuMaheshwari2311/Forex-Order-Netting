import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { chart } from 'highcharts'; 
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  headerRow: string[];
  dataRows = new Array();
  time: any;
  @ViewChild('EURUSD') EURUSD: ElementRef;
  @ViewChild('GBPEUR') GBPEUR: ElementRef;
  @ViewChild('GBPUSD') GBPUSD: ElementRef;
  chart1: HighCharts.ChartObject;
  chart2: HighCharts.ChartObject;
  chart3: HighCharts.ChartObject;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.headerRow = ["Currency Pair", "Bid", "Ask","Spread", "Price"];
    this.http.get("https://forex.1forge.com/1.0.3/quotes?pairs=EURUSD,GBPEUR,GBPUSD&api_key=qlajbqVH3vSEL3pn2EgoHQ6mwdKvKMRU").subscribe(res=>{
      for(var i in res){
        var data = new Array();
        data.push(res[i]['symbol']);
        data.push(res[i]['bid']);
        data.push(res[i]['ask']);
        data.push(Math.round((res[i]['ask'] - res[i]['bid'])*10000000)/10000000);
        data.push(res[i]['price']);
        this.dataRows.push(data);
        this.time = new Date(res[i]['timestamp'] * 1000);
      }
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
          text: 'USD to EUR exchange rate over time'
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
                [1, 'rgb(240, 240, 255)']
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
          name: 'USD to EUR',
          data: data
        }]
      }
      this.chart1 = chart(this.EURUSD.nativeElement, options);
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
          text: 'EUR to GBP exchange rate over time'
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
                [1, 'rgb(240, 240, 255)']
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
          name: 'EUR to GBP',
          data: data
        }]
    
      }
      this.chart2 = chart(this.GBPEUR.nativeElement, options);
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
          text: 'USD to GBP exchange rate over time'
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
                [1, 'rgb(240, 240, 255)']
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
          name: 'USD to GBP',
          data: data
        }]
    
      }
      this.chart3 = chart(this.GBPUSD.nativeElement, options);
    });
  }



}
