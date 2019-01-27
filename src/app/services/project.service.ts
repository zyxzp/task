import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, User } from '../domain';
import { map, mergeMap, count, bufferCount, switchMap, mapTo } from 'rxjs/operators';
import { from } from 'rxjs';
import * as _ from 'lodash';
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
        const delTasks$ = from(project.taskLists ? project.taskLists : [])
            .pipe(
                mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)),
                count()
            );
        return delTasks$.pipe(
            switchMap(_ => this.http.delete<Project>(uri)),
            mapTo(project)
        );
    }

    getProject(userId: string) {
        const url = `${this.config.uri}/${this.domain}`;
        return this.http.get<Project[]>(url, { params: { 'members_like': userId } });
    }
    invite(projectId: string, members: User[]) {
        const uri = `${this.config.uri}/${this.domain}/${projectId}`;


        return this.http.get<Project>(uri)
            .pipe(
                switchMap(project => {
                    const existingMember = project.members;
                    const invitedIds=members.map(user=>user.id);
                    const toUpdate = {
                        members: _.union(existingMember, invitedIds)
                    };
                    return this.http
                        .patch<Project>(uri, JSON.stringify(toUpdate), { headers: this.headers });
                })
            );
    }
}