import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-broker',
  templateUrl: './dashboard-broker.component.html'
})
export class DashboardBrokerComponent implements OnInit {
  public headerRow: string[];
  public dataRows = new Array();
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
  }

}
