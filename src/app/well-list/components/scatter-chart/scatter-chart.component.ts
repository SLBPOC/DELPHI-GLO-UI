import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/brand-dark';
theme(Highcharts);
import { Subscription } from 'rxjs';
import { AlgorithmsAndMitigationsService } from '../../../shared/services/algorithms-and-mitigations.service';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit, OnDestroy{

  series: any = [];
  chartData!: any;
  chartInfo!: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  chartSubscription!: Subscription;
  chartInfoSubscription!: Subscription;

  constructor(private service: AlgorithmsAndMitigationsService) {}

 ngOnInit(): void {
    this.getChartData();
    this.getChartInfo();
 }

 getChartData(): void{
  this.chartSubscription = this.service.getScatterChartData().subscribe((data: any) => {
    this.series = data;
    this.drawChart();
  })
  this.drawChart();
 }

 getChartInfo() {
  this.chartInfoSubscription = this.service.getChartInfo().subscribe((data: any) => {
    this.chartInfo = data;
    console.log(this.chartInfo)
  })
 }

  drawChart() {
    Highcharts.setOptions({
      colors: ['rgba(5,141,199,0.5)', 'rgba(80,180,50,0.5)', 'rgba(237,86,27,0.5)']
    });

    Highcharts.chart('scatter-chart', {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Scatter chart',
        align: 'left'
      },
      // subtitle: {
      //   text:
      //     'Source: <a href="https://www.theguardian.com/sport/datablog/2012/aug/07/olympics-2012-athletes-age-weight-height">The Guardian</a>',
      //   align: 'left'
      // },
      xAxis: {
        title: {
          text: 'Height'
        },
        labels: {
          format: '{value} m'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: 'Weight'
        },
        labels: {
          format: '{value} kg'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 2.5,
            symbol: 'circle',
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          jitter: {
            x: 0.005
          }
        }
      },
      tooltip: {
        pointFormat: 'Height: {point.x} m <br/> Weight: {point.y} kg'
      },
      series: this.series
    } as any

    );
  }
 ngOnDestroy(): void {
     this.chartSubscription.unsubscribe();
     this.chartInfoSubscription.unsubscribe();
 }

}
