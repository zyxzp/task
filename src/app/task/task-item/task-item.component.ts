import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { MatCardAvatar } from '@angular/material';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
    // this.avatar=this.item.owner?this.item.owner.avatar:"unassigned";
    this.avatar = "unassigned";
  }

  onItemClick() {
    this.taskClick.emit();
  }
  onCheckboxClick(event: Event) {
    event.stopPropagation();
  }
}
