import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ItemAnim } from '../../anims/item.anim';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [ItemAnim]
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  widerpriority = 'in';
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
  @HostListener('mouseenter')
  onmMouseEnter() {
    this.widerpriority = 'out';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerpriority = 'in';
  }
}
