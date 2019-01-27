import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, TaskList } from '../domain';
import { map, mergeMap, count, mapTo, bufferCount, switchMap, reduce } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable()
export class TaskService {
    private readonly domain = 'tasks';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    constructor(@Inject('BASE_CONFIG') private config,
        private http: HttpClient) {
    }
    add(task: Task) {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post<Task>(uri, JSON.stringify(task), { headers: this.headers });
    }
    update(task: Task) {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        const toUpdate = {
            desc: task.desc,
            ownerId: task.ownerId,
            participantIds: task.participantIds,
            dueDate: task.dueDate,
            reminder: task.reminder,
            priority: task.priority,
            remark: task.remark
        };
        return this.http
            .patch<Task>(uri, JSON.stringify(toUpdate), { headers: this.headers });
    }
    delete(task: Task) {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        return this.http.delete<Task>(uri).pipe(
            mapTo(task)
        );
    }


    // GET /task
    get(taskListId: string) {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get<Task[]>(uri, { params: { 'taskListId': taskListId } });
    }
    getByLists(lists: TaskList[]): Observable<Task[]> {
        return from(lists).pipe(
            mergeMap(list => this.get(list.id)),
            reduce((tasks, t) => [...tasks, ...t], [])
        );
    }

    moveAll(srcListId, targetListId): Observable<Task[]> {
        return this.get(srcListId).pipe(
            mergeMap(tasks => from(tasks)),
            mergeMap(task => this.move(task.id, targetListId)),
            reduce((arrTasks, t: Task) => {
                return [...arrTasks, t];
            }, [])
        );
    }

    move(taskId: string, taskListId: string) {
        const uri = `${this.config.uri}/${this.domain}/${taskId}`;
        return this.http
            .patch<Task>(uri, JSON.stringify({ taskListId: taskListId }), { headers: this.headers })
    }

    complete(task: Task) {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        return this.http
            .patch<Task>(uri, JSON.stringify({ completed: !task.completed }), { headers: this.headers })
    }
}