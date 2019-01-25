import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from '../actions/quote.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { QuoteService } from '../services/quote.service';
@Injectable()
export class QuoteEffects {
    @Effect() loadQuote$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.LoadAction>(actions.ActionTypes.LOAD),
            mergeMap(() => this.quoteService.getQuote()
                .pipe(
                    // If successful, dispatch success action with result
                    map(quote => new actions.LoadSuccessAction(quote)),
                    // If request fails, dispatch failed action
                    catchError((error) => of(new actions.LoadFailAction(JSON.stringify(error))))
                )
            )
        );

    constructor(
        private actions$: Actions,
        private quoteService: QuoteService
    ) { }
}