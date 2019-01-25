import { Component, OnInit } from '@angular/core';
import { Quote } from '../../domain/quote.model';
import { QuoteService } from 'src/app/services/quote.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as quoteActions from '../../actions/quote.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  quote$: Observable<Quote>;
  constructor(private quoteService: QuoteService,
    private store: Store<fromRoot.State>) {
    //1、调action获取名人名言，
    //2、会被quote.effects截获，在effect中调service,成功后会将数据保存到store中
    store.dispatch(new quoteActions.LoadAction());
    //从store中获取数据，
    this.quote$ = this.store.pipe(select(fromRoot.getQuoteState));
  }

  ngOnInit() {

  }

}
