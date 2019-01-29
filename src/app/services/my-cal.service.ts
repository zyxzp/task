import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Task} from '../domain';
import {CalendarEvent} from 'angular-calendar';
import {endOfDay, startOfDay} from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 1:
      return colors.red;
    case 2:
      return colors.yellow;
    case 3:
    default:
      return colors.blue;
  }
};

@Injectable()
@Injectable()
export class MyCalService {
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    constructor(@Inject('BASE_CONFIG') private config,
        private http: HttpClient) {
    }

  getUserTasks(userId: string): Observable<CalendarEvent[]> {
    const uri = `${this.config.uri}/tasks`;
    return this.http
      .get<Task[]>(uri, {params: {'ownerId': userId}}).pipe(
        map(tasks => {
          return tasks.map(task => {
            return {
              start: startOfDay(task.createDate),
              end: task.dueDate ? endOfDay(task.dueDate) : endOfDay(task.createDate),
              title: task.desc,
              color: getPriorityColor(task.priority)
            };
          });
        })
      );
      
  }
}




