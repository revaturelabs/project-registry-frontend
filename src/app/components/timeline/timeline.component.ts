import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import moment from 'moment';
import { Item, Period, Section } from 'ngx-time-scheduler';
import { map } from 'rxjs/operators';
import { IterationService } from 'src/app/service/iteration.service';
import { mockData } from './timelineMockData';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit, AfterViewInit {
  periods: Period[] = [];
  sections: Section[] = [];
  items: Item[] = [];
  numOfDays = 0;
  timelineLowerBound = moment().subtract(7, 'days');
  timelineUpperBound = moment();
  topLeftHeaderName = 'Batch';
  @ViewChild('ngxTs', { static: true }) ngxTs!: ElementRef;

  constructor(public iter: IterationService, private datePipe: DatePipe) {}

  ngAfterViewInit(): void {
    const colWidthCoefficient = 90;
    this.ngxTs.nativeElement.querySelector('.time-sch-table-wrapper').style[
      'width'
    ] = `${204 + colWidthCoefficient * this.numOfDays}px`;
    const topLeftHeader: HTMLElement = this.ngxTs.nativeElement.querySelector(
      '.time-sch-section'
    );
    topLeftHeader.innerHTML = this.topLeftHeaderName;
    topLeftHeader.setAttribute('rowspan', '2');
    const timeScheduleTable: HTMLElement = this.ngxTs.nativeElement.querySelector(
      '.time-sch-table'
    );
    const colHeaders = timeScheduleTable.querySelectorAll(
      'tr:nth-of-type(2) > td'
    );
    const weekDayMapper: Record<string, string> = {
      Mon: 'Monday',
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
      Sun: 'Sunday',
    };
    colHeaders.forEach((elm) => {
      const res = /(\d+)\(([A-z]+)\)/.exec(elm.innerHTML) as Array<string>;
      elm.innerHTML = `
      <div style="display: flex; flex-direction: column;">
        <span style="font-size:16px">${res[1]}</span>
        <span style="font-size:13px">${weekDayMapper[res[2]]}</span>
      </div>`;
    });
  }

  ngOnInit() {
    /* this.iter // Mock endpoind
      .getBatchServiceMock()
      .pipe(
        map((batch) =>
          batch.sort(
            (a, b) =>
              new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          )
        )
      ); */
    let batch = mockData;
    batch = batch
      .sort(
        (a, b) =>
          new Date(a['endDate']).getTime() - new Date(b['endDate']).getTime()
      )
      .filter(
        (d) =>
          new Date(d['endDate']).getTime() -
            this.timelineLowerBound.toDate().getTime() >
          0
      );
    this.timelineUpperBound = moment(batch[batch.length - 1].endDate).add(
      1,
      'day'
    );

    for (let i = 0; i < batch.length; i++) {
      this.sections.push({
        id: i + 1,
        name:
          this.datePipe.transform(batch[i].startDate, 'mediumDate') +
          ' - ' +
          this.datePipe.transform(batch[i].endDate, 'mediumDate'),
      });
      this.items.push({
        id: i + 1,
        sectionID: i + 1,
        name: `${batch[i].batchId} : ${batch[i].skill} @ ${batch[i].location}`,
        start: moment(new Date(batch[i].startDate)).startOf('day'),
        end: moment(new Date(batch[i].endDate)),
        classes: '',
      });
    }

    this.numOfDays =
      this.timelineUpperBound.diff(this.timelineLowerBound, 'days') + 1;
    this.periods = [
      {
        name: '',
        classes: '',
        timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        timeFramePeriod: 1440,
        timeFrameOverall: 1440 * this.numOfDays,
      },
    ];
  }
}
