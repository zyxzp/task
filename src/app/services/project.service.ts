import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../domain';
import { map, mergeMap, count, bufferCount, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    constructor(@Inject('BASE_CONFIG') private config,
        private http: HttpClient) {
    }

    add(project: Project) {
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post<Project>(uri, JSON.stringify(project), { headers: this.headers });
    }
    update(project: Project) {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
            .patch<Project>(uri, JSON.stringify(toUpdate), { headers: this.headers });
    }
    delete(project: Project) {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        //删除project下列表
        const delTasks$ = from(project.taskLists)
        .pipe(
           mergeMap(listId=>this.http.delete(`${this.config.uri}/taskLists/${listId}`)),
           count()
        );
        return delTasks$.pipe(
            switchMap(_=>this.http.delete<Project>(uri))
        );
    }

    getProject(userId:string) {
        const url = `${this.config.uri}/${this.domain}`;
        return this.http.get<Project[]>(url,{params:{'members_like':userId}});
    }
}