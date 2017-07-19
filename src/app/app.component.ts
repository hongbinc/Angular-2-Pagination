import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

import { PagerService } from './services/pager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: Http, private pagerService: PagerService) { }

  private title: string = 'app works! heyhey';

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit(): void {
    this.getCategories()
      .subscribe((data) => {
        this.allItems = data;
        // initialize to page 1
        this.setPage(1);
        console.log(this.pagedItems);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, 2);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getCategories(): Observable<any> {
    return Observable.create((observable) => {
      this.http
        .get("https://api.github.com/users?since=135")
        .map((r: Response) => r.json())
        .subscribe((data) => {
          observable.next(data);
          observable.complete();
        }, (error) => {
          console.error("Error caught while getting categories: ", error);
          observable.next([]);
          observable.complete();
        });
    });
  }


}
