import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html'
})
export class ClientDetailsComponent implements OnInit {
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

  
  public headerRow: string[];
  public headerRowNet: string[];
  public dataRows = new Array();
  public dataRowsNet = new Array();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.headerRow = ["Trade Number", "Currency Pair", "Base Notional", "Price", "Volume", "Direction"];
    this.headerRowNet = ["Currency Pair", "Net Amount", "Direction"]
  }

  getClientDetails({value}){
    var key = (Object.keys(this.clientList).find(key => this.clientList[key] === value['name']));
    this.dataRows = new Array();
    this.dataRowsNet = new Array();
    this.http.get("http://localhost:8090/orders/getAllTrade").subscribe(res=>{
      for(var data in res){
        if(res[data]['clientId'] == this.idNameMap[value['name']]){
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
    
    this.http.get("http://localhost:8090/client/netValue").subscribe(res=>{
      for(var i in res){
        if(res[i]['clientName'] == value['name']){
          var temp = new Array();
          temp.push(res[i]['ccyCode']);
          temp.push(res[i]['net'] < 0 ? res[i]['net'] * -1 : res[i]['net']);
          if(res[i]['net'] < 0) {
            temp.push("S");
          }
          else if(res[i]['net'] == 0){
            temp.push("-");
          }
          else {
            temp.push("B");
          }
          this.dataRowsNet.push(temp);
        }
      }
    });
  }

}
