import { Component, IterableDiffers } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Chart } from "node_modules/chart.js";
import { Compiler } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fireplots';
  pulseChart = [];
  cusChart = [];
  dataa = [];
  datab = [];
  abc="";
  // itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  differs: IterableDiffers;
  constructor(db:AngularFireDatabase,private _compiler: Compiler){
    this.items = db.list('/cnt').valueChanges();
    this.items.subscribe(res=> {
      this.dataa.push(res[0])
      console.log(this.dataa)
    });}
    ngOnInit(){

      this._compiler.clearCache();

      this.cusChart = new Chart("Chart1", {
        responsive:true,
        type: 'line',
        options: {
      },
  // The data for our dataset
  data: {
    labels: ['a'],
    datasets: [{
        label: '',
        backgroundColor: 'rgb(0, 178, 207)',
        borderColor: 'rgb(0,0,0)',
        data: [1]

    }]
  },
  })

}

  ngDoCheck(){
    if(this.dataa[this.dataa.length-1]>=10){
      this.abc = "visible";
    }
    else{
      this.abc = "hidden";
    }

      function addData(chart, data) {
        chart.data.labels = data;
        chart.data.datasets.forEach((dataset) => {
            dataset.data = data;
        });
        chart.update();

    }
    if(this.dataa.length > 20){
      this.dataa.splice(0, 1);
      addData(this.cusChart, this.dataa);
    }
    else{
      addData(this.cusChart, this.dataa);

    }
    addData(this.cusChart, this.dataa);
    }

}
