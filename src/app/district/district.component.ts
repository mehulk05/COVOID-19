import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../shared/corona.service';

@Component({
  selector: '[app-district]',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
districtdata
  isAscendingSort: boolean=false;

  constructor(private cs:CoronaService,) { }

  ngOnInit(): void {
    this.cs.districtdata.subscribe(data=>{
      this.districtdata=data
      console.log(data)
    })
    
  }

  sortDistrict(districtdata){
   const x= districtdata.forEach(item => item.keys.sort(function (a, b) {
      if (b < a) {
        return -1;
      }
      /* if (b.confirmed > a.confirmed) {
        return 1;
      } */
      return 0;
    }))

    console.log(x)
  }

 
  
 
}


