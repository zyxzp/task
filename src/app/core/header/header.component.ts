import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDark = new EventEmitter<boolean>();
  constructor() {
  }

  ngOnInit() {
  }
  openSideBar() {
    this.toggle.emit();
  }
  onChange(checked: boolean) {
    this.toggleDark.emit(checked);

  }

}
