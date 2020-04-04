import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoronaService implements OnInit {
  data1
  state
  district
  BannerData: BehaviorSubject<any> = new BehaviorSubject('')
  districtdata: Subject<any> = new Subject<any>();

  url_statewise = 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise'
  url_dailycases = 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise/history'
  ulr_districtwise = "https://api.covid19india.org/state_district_wise.json"
  url_banner = "https://api.covid19india.org/website_data.json"
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

    this.getDataStateWise()
  }

  getBanners(): Observable<any> {
    return this.http.get(this.url_banner)
  }

  getDataStateWise(): Observable<any> {
    return this.http.get(this.url_statewise)
  }

 getDailyCaseStatus(): Observable<any> {
    return this.http.get(this.url_dailycases)
  }

  getState(state) {
    this.state = state
  }

  getDataDistrictWise(state) {
    this.http.get(this.ulr_districtwise).subscribe(data => {
      this.data1 = data
    //  console.log(this.data1)
   //   console.log(this.data1[state])
      this.district = this.data1[state].districtData
    //  console.log(state)
      this.districtdata.next(this.district)
    }
    )
  }

}