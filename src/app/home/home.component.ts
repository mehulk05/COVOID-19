import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../shared/corona.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showarrow=true
 
  showDistrict:boolean=false
  sortedDataBasedOnDate
  private isAscendingSort: boolean = false;

  DailystateStatus: Array<any> = [{ state: '', confirmed: '', recovered: '', deaths: '', active: '' }];
  DailyStatus: any = { total: '' }
  statewisedata: Array<any> = [{ state: '', confirmed: '', recovered: '', deaths: '', active: '' }];
  statewisecase: any = { confirmed: '', active: '', recovered: '', deaths: '' }
  startdate = new Date()
  lastupdateddate = new Date();
  lastupdated: any = { hour: 0, minute: 0, second: 0 }

  constructor(private cs: CoronaService) { }

  ngOnInit(): void {

    this.getStateWise()
    this.testData()
  }

  testData() {
    this.cs.getDailyCaseStatus().subscribe(
      response => {
        this.sortedDataBasedOnDate = response.data.history
        this.sortByMaxCases(this.sortedDataBasedOnDate)
       
       // console.log(this.sortedDataBasedOnDate);
        this.calculateDiff(this.sortedDataBasedOnDate)
        this.statewisedata = this.sortedDataBasedOnDate[this.sortedDataBasedOnDate.length - 1].statewise

      },
      error => {
        console.log(error);
      }
    );
  }

  calculateDiff(data) {
    let x = data
    let last: any = x[x.length - 1];
    let last2: any = x[x.length - 2];

    function calculate(schema1, schema2) {
      var ret = {};
      for (var key in schema1) {
        if (schema1.hasOwnProperty(key) && schema2.hasOwnProperty(key)) {
          var obj = schema1[key];
          var obj2 = schema2[key]
          if (typeof obj === "number" && !isNaN(obj) && typeof obj2 === "number" && !isNaN(obj2)) {
            ret[key] = obj - obj2;
          }
          else {
            if (typeof obj === 'object' && typeof obj2 === 'object') {
              ret[key] = calculate(obj, obj2);
            }
            else {
              ret[key] = obj;
            }
          }
        }
      }
      return ret;
    }
    let test = calculate(last, last2);
    this.DailyStatus = test;
    this.DailystateStatus = this.DailyStatus.statewise
  }







  getStateWise() {
    this.cs.getDataStateWise().subscribe(data => {
      //console.log(data)    
      this.lastupdateddate = data.data.lastRefreshed

      function getDataDiff(startDate, endDate) {
        var diff = endDate.getTime() - startDate.getTime();
        var days = Math.floor(diff / (60 * 60 * 24 * 1000));
        var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
        var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
        var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
        return { day: days, hour: hours, minute: minutes, second: seconds };
      }

      this.lastupdated = getDataDiff(new Date(this.lastupdateddate), new Date(this.startdate));

    },
      err => {
        console.log(err)
      })
  }

  OngetState(state) {

    this.cs.getState(state)
    this.cs.getDataDistrictWise(state)
 
  }

  showHideData(data) {
    if(data && data['show'] == true) {
      data['show'] = false;
    } else {
      data['show'] = true;
    }
  }

  sortAscending(data) {
    this.isAscendingSort = !this.isAscendingSort;
    this.showarrow=true
    data.forEach(item => item.statewise.sort(function (a, b) {
      if (b.state < a.state) {
        return -1;
      }
      if (b.state > a.state) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
this.showarrow=!this.showarrow
      let a = data.forEach(item => item.statewise.sort(function (a, b) {
        if (a.state < b.state) {
          return -1;
        }
        if (a.state > b.state) {
          return 1;
        }
        return 0;
      }))
      this.calculateDiff(this.sortedDataBasedOnDate)
    }
  }

  sortByMaxCases(sortedDataBasedOnDate) {
    this.isAscendingSort = !this.isAscendingSort;
    console.log(this.isAscendingSort)
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
      if (b.confirmed < a.confirmed) {
        return -1;
      }
      if (b.confirmed > a.confirmed) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (a.confirmed < b.confirmed) {
          return -1;
        }
        if (a.confirmed > b.confirmed) {
          return 1;
        }
        return 0;
      }))

      this.calculateDiff(this.sortedDataBasedOnDate)
    }
  }

  sortByMaxActive(sortedDataBasedOnDate) {
    this.isAscendingSort = !this.isAscendingSort;
    console.log(this.isAscendingSort)
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
      if (a.active < b.active) {
        return -1;
      }
      if (a.active > b.active) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      console.log(this.isAscendingSort)
      sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (b.active < a.active) {
          return -1;
        }
        if (b.active > a.active) {
          return 1;
        }
        return 0;
      }))
      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

  sortByMaxRecovered(sortedDataBasedOnDate) {

    this.isAscendingSort = !this.isAscendingSort;
    console.log(this.isAscendingSort)
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
      if (b.recovered < a.recovered) {
        return -1;
      }
      if (b.recovered > a.recovered) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {

      console.log(this.isAscendingSort)
      sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (a.recovered < b.recovered) {
          return -1;
        }
        if (a.recovered > b.recovered) {
          return 1;
        }
        return 0;
      }))

      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

  sortByMaxDeath(sortedDataBasedOnDate) {
    this.isAscendingSort = !this.isAscendingSort;
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
      if (b.deaths < a.deaths) {
        return -1;
      }
      if (b.deaths > a.deaths) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      console.log(this.isAscendingSort)
      sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (a.deaths < b.deaths) {
          return -1;
        }
        if (a.deaths > b.deaths) {
          return 1;
        }
        return 0;
      }))

      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

}