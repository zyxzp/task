import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Project } from '../domain';
import { map, mergeMap, count, bufferCount, switchMap, mapTo, filter, reduce } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
@Injectable()
export class UserService {
    private readonly domain = 'users';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    constructor(@Inject('BASE_CONFIG') private config,
        private http: HttpClient) {
    }
    searchUsers(filter: string) {
        const url = `${this.config.uri}/${this.domain}`;
        return this.http.get<User[]>(url, { params: { 'email_like': filter } });
    }

    getUsersByProject(projectId: string) {
        const url = `${this.config.uri}/${this.domain}`;
        return this.http.get<User[]>(url, { params: { 'projectId': projectId } });
    }

    addProjectRef(user: User, projectId: string): Observable<User> {
        const url = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        if (projectIds.indexOf(projectId) > -1) {
            return of(user);
        }
        const toUpdate = {
            projectIds: [...projectIds, projectId]
        };
        return this.http.patch<User>(url, JSON.stringify(toUpdate), { headers: this.headers });
    }
    removeProjectRef(user: User, projectId: string): Observable<User> {
        const url = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        const index = projectIds.indexOf(projectId);
        if (index === -1) {
            return of(user);
        }
        const toUpdate = {
            projectIds: [...projectIds.splice(0, index), ...projectIds.splice(index + 1)]
        };
        return this.http.patch<User>(url, JSON.stringify(toUpdate), { headers: this.headers });
    }

    batchUpdateProjectRef(project: Project):Observable<User[]> {
        const projectId = project.id;
        const memberIds = project.members;
        return of(memberIds).pipe(
            switchMap(id => {
                const url = `${this.config.uri}/${this.domain}/${id}`;
                return this.http.get<User>(url);
            }),
            filter(user => user.projectIds.indexOf(projectId) === -1),//过滤掉已经存在的projectId
            switchMap(u => this.addProjectRef(u, projectId)),//user中增减跟项目的关联projectId
            reduce((arr, u: User) => [...arr, u], [])//将流集合成数组
        );
    }
}