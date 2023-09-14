import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WellsService } from 'src/app/shared/services/wells.service';
import * as Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);

@Component({
  selector: 'app-well-view-tabs',
  templateUrl: './well-view-tabs.component.html',
  styleUrls: ['./well-view-tabs.component.scss'],
})
export class WellViewTabsComponent {
  wellInfo!: any;
  wellId!: any;
  qo1!: number;
  loader = false;
  searchString: string = '';
  wellDetails: any;
  Highcharts: typeof Highcharts = Highcharts;
  updateFromInput: boolean = false;

  constructor(
    private service: WellsService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.wellId = this._Activatedroute.snapshot.paramMap.get('id');
    console.log(this.wellId);
  }
  ngOnInit() {
    this.loader = true;
    this.getWellGeneralInfo();
  }

  getWellGeneralInfo() {
    this.service.getWellInfo(this.wellId).subscribe((resp) => {
      this.wellInfo = resp;
      this.searchString = this.wellInfo.wellName;
      this.loader = false;
    });
  }
  chartOptions10: Highcharts.Options = {
    title: {
      text: 'U.S Solar Employment Growth',
      align: 'left',
    },

    subtitle: {
      align: 'left',
    },

    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription:
          'Range:  new Date (Date.UTC(23, 1, 2, 3, 4, 5)) to  new Date (Date.UTC(23, 1, 2, 9, 4, 5))',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2023,
      },
    },
    colors: ['green', '#6CF'],
    series: [
      {
        name: 'Production WellHead sm-38L',
        type: 'spline',
        data: [
          160, 100, 110, 180, 150, 110, 100, 110, 180, 150, 110, 100, 110, 180,
          160, 100, 110, 180, 150, 110, 100, 110, 180, 150, 110, 100, 110, 180,
          160, 100, 110, 180, 150, 110, 100, 110, 180, 150, 110, 100, 110, 180,
          160, 100, 110, 180, 150, 110, 100, 110, 180, 150, 110, 100, 110, 180,
        ],
      },
      {
        name: 'Casing pressure SM-38',
        type: 'spline',
        data: [
          320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320,
          320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320,
          320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320,
        ],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 200,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Snow depth at Vikjafjellet, Norway',
    },
    subtitle: {
      text: 'Irregular time data in Highcharts JS',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        // don't display the year
        // month: '%b',
        // year: '%b',
      },
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Snow depth (t)',
      },
      min: 0,
    },
    // tooltip: {
    //   headerFormat: '<b>{series.name}</b><br>',
    //   pointFormat: '{point.x:%e. %b}: {point.y:.2f} m',
    // },

    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 1.5,
        },
      },
    },

    colors: ['#6CF', 'green'],

    series: [
      {
        name: 'Winter 2019-2020',
        type: 'spline',
        data: [
          [Date.UTC(1970, 5, 1), 621],
          [Date.UTC(1970, 5, 2), 621],
          [Date.UTC(1970, 5, 4), 621],
          [Date.UTC(1970, 5, 5), 621],
          [Date.UTC(1970, 5, 6), 621],
          [Date.UTC(1970, 5, 7), 621],
          [Date.UTC(1970, 5, 17), 621],
          [Date.UTC(1970, 5, 16), 621],
          [Date.UTC(1970, 5, 14), 621],
          [Date.UTC(1970, 5, 16), 621],
          [Date.UTC(1970, 5, 18), 621],
          [Date.UTC(1970, 5, 21), 621],
          [Date.UTC(1970, 5, 24), 621],
          [Date.UTC(1970, 5, 27), 621],

          [Date.UTC(1970, 1, 2), 621],
          [Date.UTC(1970, 1, 1), 621],
          [Date.UTC(1970, 1, 4), 621],
          [Date.UTC(1970, 1, 5), 621],
          [Date.UTC(1970, 1, 6), 621],
          [Date.UTC(1970, 1, 7), 621],
          [Date.UTC(1970, 1, 17), 621],
          [Date.UTC(1970, 1, 16), 621],
          [Date.UTC(1970, 1, 14), 621],
          [Date.UTC(1970, 1, 16), 621],
          [Date.UTC(1970, 1, 18), 621],
          [Date.UTC(1970, 1, 21), 621],
          [Date.UTC(1970, 1, 24), 621],
          [Date.UTC(1970, 1, 27), 621],

          [Date.UTC(1970, 2, 1), 621],
          [Date.UTC(1970, 2, 2), 621],
          [Date.UTC(1970, 2, 4), 621],
          [Date.UTC(1970, 2, 5), 621],
          [Date.UTC(1970, 2, 6), 621],
          [Date.UTC(1970, 2, 7), 621],
          [Date.UTC(1970, 2, 17), 621],
          [Date.UTC(1970, 2, 16), 621],
          [Date.UTC(1970, 2, 14), 621],
          [Date.UTC(1970, 2, 16), 621],
          [Date.UTC(1970, 2, 18), 621],
          [Date.UTC(1970, 2, 21), 621],
          [Date.UTC(1970, 2, 24), 621],
          [Date.UTC(1970, 2, 27), 621],

          [Date.UTC(1970, 3, 1), 621],
          [Date.UTC(1970, 3, 2), 621],
          [Date.UTC(1970, 3, 4), 621],
          [Date.UTC(1970, 3, 5), 621],
          [Date.UTC(1970, 3, 6), 621],
          [Date.UTC(1970, 3, 7), 621],
          [Date.UTC(1970, 3, 17), 621],
          [Date.UTC(1970, 3, 16), 621],
          [Date.UTC(1970, 3, 14), 621],
          [Date.UTC(1970, 3, 16), 621],
          [Date.UTC(1970, 3, 18), 621],
          [Date.UTC(1970, 3, 21), 621],
          [Date.UTC(1970, 3, 24), 621],
          [Date.UTC(1970, 3, 27), 621],

          [Date.UTC(1970, 4, 1), 621],
          [Date.UTC(1970, 4, 2), 621],
          [Date.UTC(1970, 4, 4), 621],
          [Date.UTC(1970, 4, 5), 621],
          [Date.UTC(1970, 4, 6), 621],
          [Date.UTC(1970, 4, 7), 621],
          [Date.UTC(1970, 4, 17), 621],
          [Date.UTC(1970, 4, 16), 621],
          [Date.UTC(1970, 4, 14), 621],
          [Date.UTC(1970, 4, 16), 621],
          [Date.UTC(1970, 4, 18), 621],
          [Date.UTC(1970, 4, 21), 621],
          [Date.UTC(1970, 4, 24), 621],
          [Date.UTC(1970, 4, 27), 621],
        ],
      },
      {
        name: 'Winter 2020-2021',
        type: 'line',

        data: [
          [Date.UTC(1970, 5, 1), 221],
          [Date.UTC(1970, 5, 2), 121],
          [Date.UTC(1970, 5, 4), 100],
          [Date.UTC(1970, 5, 5), 51],
          [Date.UTC(1970, 5, 6), 31],
          [Date.UTC(1970, 5, 7), 21],
          [Date.UTC(1970, 5, 17), 16],
          [Date.UTC(1970, 5, 16), 11],
          [Date.UTC(1970, 5, 14), 5],
          [Date.UTC(1970, 5, 16), 1],
          [Date.UTC(1970, 5, 18), 21],
          [Date.UTC(1970, 5, 21), 101],
          [Date.UTC(1970, 5, 24), 121],
          [Date.UTC(1970, 5, 27), 221],

          [Date.UTC(1970, 1, 1), 221],
          [Date.UTC(1970, 1, 2), 121],
          [Date.UTC(1970, 1, 4), 100],
          [Date.UTC(1970, 1, 5), 51],
          [Date.UTC(1970, 1, 6), 31],
          [Date.UTC(1970, 1, 7), 21],
          [Date.UTC(1970, 1, 17), 16],
          [Date.UTC(1970, 1, 16), 11],
          [Date.UTC(1970, 1, 14), 5],
          [Date.UTC(1970, 1, 16), 1],
          [Date.UTC(1970, 1, 18), 21],
          [Date.UTC(1970, 1, 21), 101],
          [Date.UTC(1970, 1, 24), 121],
          [Date.UTC(1970, 1, 27), 221],

          [Date.UTC(1970, 2, 1), 221],
          [Date.UTC(1970, 2, 2), 121],
          [Date.UTC(1970, 2, 4), 100],
          [Date.UTC(1970, 2, 5), 51],
          [Date.UTC(1970, 2, 6), 31],
          [Date.UTC(1970, 2, 7), 21],
          [Date.UTC(1970, 2, 17), 16],
          [Date.UTC(1970, 2, 16), 11],
          [Date.UTC(1970, 2, 14), 5],
          [Date.UTC(1970, 2, 16), 1],
          [Date.UTC(1970, 2, 18), 21],
          [Date.UTC(1970, 2, 21), 101],
          [Date.UTC(1970, 2, 24), 121],
          [Date.UTC(1970, 2, 27), 221],

          [Date.UTC(1970, 3, 1), 221],
          [Date.UTC(1970, 3, 2), 121],
          [Date.UTC(1970, 3, 4), 100],
          [Date.UTC(1970, 3, 5), 51],
          [Date.UTC(1970, 3, 6), 31],
          [Date.UTC(1970, 3, 7), 21],
          [Date.UTC(1970, 3, 17), 16],
          [Date.UTC(1970, 3, 16), 11],
          [Date.UTC(1970, 3, 14), 5],
          [Date.UTC(1970, 3, 16), 1],
          [Date.UTC(1970, 3, 18), 21],
          [Date.UTC(1970, 3, 21), 101],
          [Date.UTC(1970, 3, 24), 121],
          [Date.UTC(1970, 3, 27), 221],

          [Date.UTC(1970, 4, 1), 221],
          [Date.UTC(1970, 4, 2), 121],
          [Date.UTC(1970, 4, 4), 100],
          [Date.UTC(1970, 4, 5), 51],
          [Date.UTC(1970, 4, 6), 31],
          [Date.UTC(1970, 4, 7), 21],
          [Date.UTC(1970, 4, 17), 16],
          [Date.UTC(1970, 4, 16), 11],
          [Date.UTC(1970, 4, 14), 5],
          [Date.UTC(1970, 4, 16), 1],
          [Date.UTC(1970, 4, 18), 21],
          [Date.UTC(1970, 4, 21), 101],
          [Date.UTC(1970, 4, 24), 121],
          [Date.UTC(1970, 4, 27), 221],
        ],
      },
    ],
  };
}
