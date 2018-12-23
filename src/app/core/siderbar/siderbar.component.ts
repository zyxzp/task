import { Component, OnInit,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { getDate } from 'date-fns';
@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SiderbarComponent implements OnInit {
  today = 'day';
  @Output() navClick=new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }
  onNavClick(){
    this.navClick.emit();

  }
}
