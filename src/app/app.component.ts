import { Component, OnInit } from '@angular/core';
import { CoronaService } from './shared/corona.service';
import { Subscription, BehaviorSubject, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covoid19';
  BannerDataList: any;
  BannerData = "Be a true Indian. Show compassion. Be considerate. Help those in need. We will get through this!"
  storebannerSubject: BehaviorSubject<any> = new BehaviorSubject("");

  count
  subscription: Subscription;
  intervalId: number;
  constructor(private cs: CoronaService) { }

  
  ngOnInit(): void {
    this.cs.getBanners().subscribe(data => {
      this.BannerDataList = data.factoids.map(item => {
        return item.banner
      })
      this.count = this.BannerDataList.length - 1
      this.BannerData = this.BannerDataList[0]

      const source = interval(5000);
      let i = 0;
      this.subscription = source.subscribe((val: any) => {
        val = this.opensnack(this.BannerDataList[i]);
        this.storebannerSubject.next(val);
        i = i + 1
         if (i <= this.count) {
           i = i + 1;
         } else {
           i = 0;
         }
      });
    })


  }
  opensnack(data) {
    this.storebannerSubject.subscribe(v => {
      this.BannerData = data;
    });
  }
}
