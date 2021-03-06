import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { DataSet } from 'vis-data/esnext';
import { Timeline } from 'vis-timeline/esnext';

import { 
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, 
} from '@angular/material/snack-bar';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  timeline: Timeline;
  options: {};
  data: any;
  groups: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild('timeline', { static: true }) timelineContainer: ElementRef;

  constructor(private _snackBar: MatSnackBar) {
    this.getTimelineData();
    this.getTimelineGroups();
    this.getOptions();  
  }

  openSnackBar() {
    this._snackBar.open('[Item 1] This is a pinned note. Will manage to use html.   [edit][position]', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  };  
  
  ngOnInit() {
    this.timeline = new Timeline(
      this.timelineContainer.nativeElement,
      [],
      this.options
    );
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);
  }

  getTimelineGroups() {
    // create groups
    this.groups = new DataSet([
      { id: 1, content: 'Case 1' },
      { id: 2, content: 'Case 2' },
      { id: 3, content: 'Case&nbsp;3' },
      { id: 4, content: 'Case&nbsp;4' },
    ]);
  }

  getTimelineData() {
    // Create a DataSet (allows two way data-binding)
    // create items
    this.data = new DataSet();
    var count = 100;
    var order = 1;
    var truck = 1;
    var max: any = 0.02;

    // create 4 truck groups, then order inside each group
    for (var j = 0; j < 4; j++) {
      var date = new Date();
      for (var i = 0; i < count / 4; i++) {
        date.setHours(date.getHours() + 4 * Math.random());
        var start = new Date(date);

        date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
        var end = new Date(date);

        this.data.add({
          id: order,
          group: truck,
          start: start,
          end: end,
          content: 'Item ' + order,
        });

        order++;
      }
      truck++;
    }
  }

  getOptions() {
    this.options = {
      stack: false,
      start: new Date(),
      end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
      editable: true,
      margin: {
        item: 20, // minimal margin between items
        axis: 5, // minimal margin between items and the axis
      },
      orientation: 'top',
    };
  }
}
