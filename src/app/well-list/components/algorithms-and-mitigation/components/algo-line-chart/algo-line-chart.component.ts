import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/brand-dark';
theme(Highcharts);
import { Subscription } from 'rxjs';
import { AlgorithmsAndMitigationsService } from 'src/app/shared/services/algorithms-and-mitigations.service';

@Component({
  selector: 'app-algo-line-chart',
  templateUrl: './algo-line-chart.component.html',
  styleUrls: ['./algo-line-chart.component.scss']
})
export class AlgoLineChartComponent implements OnInit, OnDestroy{

  series: any = [];
  chartData!: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  chartSubscription!: Subscription;

  constructor(private service: AlgorithmsAndMitigationsService) {}

 ngOnInit(): void {
    this.getChartData();
 }

 getChartData(): void{
  this.chartSubscription = this.service.getAlgorithmsAndMitigationsChartData().subscribe((data: any) => {
    console.log('algolinechart', data)
    this.series = data;
    this.drawChart();

  })
 }

 drawChart(): void {
  Highcharts.chart('line-chart', {
    chart: {
      type: 'line'
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
      layout: 'horizontal',
            verticalAlign: 'top',
          
    },
    yAxis: [{
      lineWidth: 1,
      title: {
          text: ''
      }
  }, 
],
  plotOptions: {
    series: {
        marker: {
            symbol: 'circle'
        }
    }
  },
    xAxis: {
      type: 'category',
      gridLineWidth: 1,
    },
    tooltip: {
      headerFormat: `<div>Date: {point.key}</div>`,
      pointFormat: `<div>{series.name}: {point.y}</div>`,
      shared: true,
      useHTML: true,
    },
    series: this.series
  } as any);
 }

 ngOnDestroy(): void {
     this.chartSubscription.unsubscribe();
 }

}
