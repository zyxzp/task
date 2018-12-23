import { Component, OnInit, Input, Output, EventEmitter, HostBinding ,HostListener,ChangeDetectionStrategy} from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
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
