import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../shared/corona.service';

@Component({
  selector: '[app-district]',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
districtdata

  constructor(private cs:CoronaService,) { }

  ngOnInit(): void {
    this.cs.districtdata.subscribe(data=>{
      this.districtdata=data
      console.log(data)
    })
    
  }
  

  /* getDistrictWise() {
   this.cs.getDataDistrictWise()
   .subscribe(data=>{
     console.log(data)
   })
  } */

}
