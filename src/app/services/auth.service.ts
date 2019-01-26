import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Auth } from '../domain';
import { map, mergeMap, count, bufferCount, switchMap, mapTo, filter, reduce } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
/**
 * 认证服务主要用于用户的注册和登录功能
 */
@Injectable()
export class AuthService {
    private readonly domain = 'users';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
        '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    /**
    * 构造函数用于注入服务的依赖以及进行必要的初始化
    *
    * @param http 注入Http
    * @param config 注入基础配置
    */
    constructor(@Inject('BASE_CONFIG') private config,
        private http: HttpClient) {
    }

    /**
     * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
     *
     * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
     */
    register(user: User): Observable<Auth> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get<User[]>(uri, { params: { 'email': user.email } }).pipe(
            switchMap(res => {
                if (res.length > 0) {
                    throw "user exist";
                }
                return this.http.post<User>(uri, JSON.stringify(user), { headers: this.headers })
                    .pipe(
                        map(r => ({ token: this.token, user: r }))
                    );
            })
        );
    }
    /**
      * 使用用户名和密码登录
      *
      * @param username 用户名
      * @param password 密码（明文），服务器会进行加密处理
    */
    login(username: string, password: string) {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get<User[]>(uri, { params: { 'email': username, 'password': password } })
            .pipe(
                map(res => {
                    if (res.length === 0) {
                        throw "username or password not match";
                    }
                    return {
                        token: this.token,
                        user: res[0]
                    }
                })
            );
    }
}
