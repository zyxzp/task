import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../domain/quote.model';

@Injectable()
export class QuoteService {
    constructor(@Inject('BASE_CONFIG') private config,
        private http: HttpClient) {

    }
    getQuote() {
        const url = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
        return this.http.get<Quote>(url);
    }
}