import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { chart } from 'highcharts'; 
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-dashboard-broker',
  templateUrl: './dashboard-broker.component.html'
})
export class DashboardBrokerComponent implements OnInit {
  public headerRow: string[];
  public dataRows = new Array();
  public headerRow1: string[];
  public dataRows1 = new Array();
  time;
  
  @ViewChild("Sell") Sell: ElementRef;
  @ViewChild("Buy") Buy: ElementRef;  @ViewChild('EURUSD') EURUSD: ElementRef;
  @ViewChild('GBPEUR') GBPEUR: ElementRef;
  @ViewChild('GBPUSD') GBPUSD: ElementRef;
  chart3: HighCharts.ChartObject;
  chart4: HighCharts.ChartObject;
  chart5: HighCharts.ChartObject;
  chart1 : Highcharts.ChartObject;
  chart2 : Highcharts.ChartObject;


  clientList = {"M002":	"MESUT OZIL",
  "T001":	"THOMAS MULLER",
  "T002":	"TONI KROOS",
  "G002":	"GONZALO HIGUAIN",
  "L001":	"LIONEL MESSI",
  "C002":	"CHRISTIANO RONALDO",
  "E001":	"EDINSON CAVANI",
  "L002":	"LUIS SUAREZ",
  "C001":	"CARLOS CASIMIRO",
  "M001":	"MARCELO VIEIRA",
  "A001":	"ANDRES INIESTA",
  "D002":	"DIEGO COSTA",
  "G001":	"GERARD PIQUE",
  "S001":	"SERGIO RAMOS",
  "H001":	"HARRY KANE",
  "H002":	"HARRY MAGUIRE",
  "J001":	"JESSE LINGARD",
  "D001":	"DENIS CHERYSHEV",
  "I001":	"IGOR AKINFEEV",
  "I002":	"IVAN RAKITIC",
  "L003":	"LUKA MODRIC",
  "A002":	"ANTOINE GRIEZMANN",
  "K001":	"KYLIAN MBAPPE",
  "O001":	"OLIVIER GIROUD",
  "P001":	"PAUL POGBA"};

clientName = ["MESUT OZIL", "THOMAS MULLER", "TONI KROOS","GONZALO HIGUAIN","LIONEL MESSI", "CHRISTIANO RONALDO","EDINSON CAVANI","LUIS SUAREZ","CARLOS CASIMIRO",
  "MARCELO VIEIRA","ANDRES INIESTA","DIEGO COSTA","GERARD PIQUE","SERGIO RAMOS","HARRY KANE","HARRY MAGUIRE","JESSE LINGARD","DENIS CHERYSHEV","IGOR AKINFEEV","IVAN RAKITIC",
  "LUKA MODRIC","ANTOINE GRIEZMANN","KYLIAN MBAPPE","OLIVIER GIROUD","PAUL POGBA"]

idNameMap = {"MESUT OZIL": 1, "THOMAS MULLER": 2, "TONI KROOS":3,"GONZALO HIGUAIN":4,"LIONEL MESSI":5, "CHRISTIANO RONALDO":6,"EDINSON CAVANI":7,"LUIS SUAREZ":8,"CARLOS CASIMIRO":9,
"MARCELO VIEIRA":10,"ANDRES INIESTA":11,"DIEGO COSTA":12,"GERARD PIQUE":13,"SERGIO RAMOS":14,"HARRY KANE":15,"HARRY MAGUIRE":16,"JESSE LINGARD":17,"DENIS CHERYSHEV":18,"IGOR AKINFEEV":19,"IVAN RAKITIC":20,
"LUKA MODRIC":21,"ANTOINE GRIEZMANN":22,"KYLIAN MBAPPE":23,"OLIVIER GIROUD":24,"PAUL POGBA":25}


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
    this.headerRow = ["Currency Pair", "Net Order", "Direction"]

    this.http.get("http://localhost:8090/broker/getCurrNet").subscribe(res=>{
      for(var i in res){
        var temp = new Array();
        temp.push(res[i]['ccyCode']);
        temp.push(res[i]['Net'] < 0 ? res[i]['Net'] * -1 : res[i]['Net']);
        if(res[i]['Net'] < 0) {
          temp.push("S");
        }
        else if(res[i]['Net'] == 0){
          temp.push("-");
        }
        else {
          temp.push("B");
        }
        this.dataRows.push(temp);
      }
    });
  
  // this.http.get("http://localhost:8090/client/netValue").subscribe(res=>{
  //   for(var i in res){
  //     if(res[i]['ccyCode'] == "EUR/USD"){

  //     }
  //     }
  //   }
  
  //   const options: HighCharts.Options = {
  //     chart: {
  //       type: 'column'
  //     },
  //     title: {
  //       text: 'Column chart with negative values'
  //     },
  //     xAxis: {
  //       categories: this.clientName
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     series: []
  //   }
  //   this.chart1 = chart(this.Buy.nativeElement, options);
  
  // });

  
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










// var series = new Array();
//     var data1 = new Array();
//     var data2 = new Array();
//     var data3 = new Array();  
//     var seriesElement1 ={ 'name': "EUR/USD", 'data': []};
//     var seriesElement2 ={ 'name': "GBP/EUR", 'data': []};
//     var seriesElement3 ={ 'name': "GBP/USD", 'data': []};
          
//     for(var i = 1; i < 25; i++){
//       this.http.get("http://localhost:8090/client/specificClientNetting/" + i).subscribe(res=>{
//         console.log(res[0])
//         var eu = 0, ge = 0, gu =0;
//         if(typeof res == 'undefined')
//           data1.push(0); data2.push(0); data3.push
//         if(typeof res[0] != 'undefined'){
//           if(res[0]['ccyCode'] == 'EUR/USD')
//             data1.push(res[0]['net']);
//           else if(res[0]['ccyCode'] == 'GBP/EUR'){
//             data2.push(res[0]['net']);
//             ge = 1;
//           }
//           else if(res[0]['ccyCode'] == 'GBP/USD')
//             data3.push(res[0]['net'])
          
//         }
//         else{
//           data1.push(0);data2.push(0);data3.push(0);
//         }
//         console.log(res[1]);
//         if(typeof res[1] != 'undefined'){
//           if(res[1]['ccyCode'] == 'GBP/EUR' && !ge)
//             data2.push(res[1]['net']);
//           else if(res[1]['ccyCode'] == 'GBP/USD')
//             data3.push(res[1]['net'])
//         }
//         else{
//           data2.push(0);data3.push(0);
//         }  
      
//         if(typeof res[2] != 'undefined'){
//           if(res[2]['ccyCode'] == 'GBP/USD')
//             data3.push(res[1]['net'])
//         }
//         else{
//           data3.push(0);
//         }  
    
//       });
//   }
//     seriesElement1['data'] = data1;
//     seriesElement2['data'] = data2;
//     seriesElement3['data'] = data3;
//     series.push(seriesElement1);
//     series.push(seriesElement2);
//     series.push(seriesElement3);
//     console.log(series);