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
  @ViewChild("Sell") Sell: ElementRef;
  @ViewChild("Buy") Buy: ElementRef;
  chart1 : Highcharts.ChartObject;
  chart2: Highcharts.ChartObject;

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

    this.http.get("http://localhost:8090/orders/getAllTrade").subscribe(res=>{
      var series = new Array();
      for(var i in res){
        var name = (Object.keys(this.idNameMap).find(key => this.idNameMap[key] == res[i]['clientId']));  
        var seriesElement ={ 'name': "", 'data': []};
        var data = Array.apply(null, Array(Object.keys(res).length)).map(Number.prototype.valueOf,0);
        console.log(data);
        //seriesElement['data'] = data;
        series.push(seriesElement);
      }
      console.log(series);
      const options: HighCharts.Options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Column chart with negative values'
        },
        xAxis: {
          categories: this.clientName
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'John',
          data: [5, 3, 4, 7, 2]
        }, {
          name: 'Jane',
          data: [2, -2, -3, 2, 1]
        }, {
          name: 'Joe',
          data: [3, 4, 4, -2, 5]
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
