import { Component, HostBinding } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { MyCalService } from '../../services/services.module';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { defaultRouteAnim } from '../../anims';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cal-home',
  template: `
    <mat-card>
    <div class="toolbar">
      <button
        mat-icon-button
        mwlCalendarPreviousView
        [view]="view$ | async"
        [(viewDate)]="viewDate">
        <mat-icon class="mat-48">chevron_left</mat-icon>
      </button>
      <button
        mat-button
        mwlCalendarToday
        [(viewDate)]="viewDate">
        {{viewDate | date: 'yyyy-MM-dd'}}
      </button>
      <button
        mat-icon-button
        mwlCalendarNextView
        [view]="view$ | async"
        [(viewDate)]="viewDate">
        <mat-icon class="mat-48">chevron_right</mat-icon>
      </button>
    </div>
    <div *ngIf="(events$ | async) as calEvents">
      <div [ngSwitch]="view$ | async">
        <mwl-calendar-month-view
          *ngSwitchCase="'month'"
          [viewDate]="viewDate"
          [locale]="'zh'"
          [events]="calEvents"
          [activeDayIsOpen]="activeDayIsOpen"
          (dayClicked)="dayClicked($event.day)"
          (eventClicked)="handleEvent('Clicked', $event.event)">
        </mwl-calendar-month-view>
        <mwl-calendar-week-view
          *ngSwitchCase="'week'"
          [viewDate]="viewDate"
          [locale]="'zh'"
          [events]="calEvents"
          (eventClicked)="handleEvent('Clicked', $event.event)">
        </mwl-calendar-week-view>
        <mwl-calendar-day-view
          *ngSwitchCase="'day'"
          [viewDate]="viewDate"
          [locale]="'zh'"
          [events]="calEvents"
          (eventClicked)="handleEvent('Clicked', $event.event)">
        </mwl-calendar-day-view>
      </div>
     </div>
     </mat-card>
  `,
  styles: [`
    .toolbar{
      display: flex;
      flex-direction: row;
    }
    :host{
      width: 100%;
    }
  `
  ],
  animations: [defaultRouteAnim],
})
export class CalendarHomeComponent {

  @HostBinding('@routeAnim') state = 'in';
  viewDate: Date;
  view$: Observable<string>;
  activeDayIsOpen = true;
  events$: Observable<CalendarEvent[]>;

  constructor(private route: ActivatedRoute,
    private service$: MyCalService,
    private store$: Store<fromRoot.State>) {
    this.viewDate = new Date();
    this.view$ = this.route.params.pipe(pluck('view'));
    this.events$ = this.store$.pipe(
      select(fromRoot.getAuth),
      switchMap(auth => this.service$.getUserTasks(auth.user.id)));
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('events handled');
  }

  dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}
